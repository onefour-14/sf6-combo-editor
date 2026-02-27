<template>
  <div class="combo-builder">
    <h1 class="title">SF6 Combo Editor</h1>

    <div class="character-select-area">
      <label for="character-select">キャラクター選択: </label>
      <select id="character-select" v-model="selectedCharacterId" @change="onCharacterChange">
        <option v-for="char in characters" :key="char.id" :value="char.id">
          {{ char.name }}
        </option>
      </select>
    </div>

    <div class="combo-display-area">
      <div v-if="combo.length === 0" class="empty-text">
        下のパレットから技を追加してください
      </div>



      <draggable v-model="combo" item-key="uid" class="combo-sequence" ghost-class="ghost" :animation="200">
        <template #item="{ element }">
          <div class="combo-item-container">
            <div class="combo-item" :class="[element.category, { 'is-selected': lastSelectedUid === element.uid }]"
              @click="selectItem(element.uid)">
              <div class="item-main">
                <span class="move-label">{{ element.label }}</span>
                <input v-model="element.annotation" placeholder="状況メモ..." class="annotation-input" @click.stop />
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>

    <div class="quick-tags-area">
      <span class="tags-label">クイックタグ:</span>
      <div class="tag-buttons">
        <button v-for="tag in quickTags" :key="tag" @click="applyTag(tag)" class="tag-btn">
          + {{ tag }}
        </button>
      </div>
    </div>
    <div class="controls">
      <button @click="clearCombo" class="btn clear-btn">クリア</button>
      <button @click="copyComboText" class="btn copy-btn">テキストでコピー</button>
    </div>

    <div class="palette">
      <div class="palette-section">
        <h3>通常技 (共通)</h3>

        <div class="sub-section">
          <h4 class="sub-header">立ち</h4>
          <div class="button-group">
            <button v-for="move in standNormalMoves" :key="move.id" @click="addMove(move)" class="move-btn normal">
              {{ move.label }}
            </button>
          </div>
        </div>

        <div class="sub-section">
          <h4 class="sub-header">しゃがみ</h4>
          <div class="button-group">
            <button v-for="move in crouchNormalMoves" :key="move.id" @click="addMove(move)" class="move-btn normal">
              {{ move.label }}
            </button>
          </div>
        </div>

        <div class="sub-section">
          <h4 class="sub-header">ジャンプ</h4>
          <div class="button-group">
            <button v-for="move in jumpNormalMoves" :key="move.id" @click="addMove(move)" class="move-btn normal">
              {{ move.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="palette-section" v-if="currentCharacter && currentCharacter.uniqueMoves?.length > 0">
        <h3>{{ currentCharacter.name }} の特殊技・ターゲットコンボ</h3>
        <div class="button-group">
          <button v-for="move in currentCharacter.uniqueMoves" :key="move.id" @click="addMove(move)"
            class="move-btn unique">
            {{ move.label }}
          </button>
        </div>
      </div>

      <div class="palette-section" v-if="currentCharacter">
        <div class="special-header">
          <h3>{{ currentCharacter.name }} の必殺技・SA</h3>
          <div class="strength-modifier">
            <span class="modifier-label">強度:</span>
            <button :class="{ active: strength === '' }" @click="strength = ''" class="mod-btn">指定なし</button>
            <button :class="{ active: strength === '弱' }" @click="strength = '弱'" class="mod-btn">弱</button>
            <button :class="{ active: strength === '中' }" @click="strength = '中'" class="mod-btn">中</button>
            <button :class="{ active: strength === '強' }" @click="strength = '強'" class="mod-btn">強</button>
            <button :class="{ active: strength === 'OD' }" @click="strength = 'OD'" class="mod-btn od">OD</button>
          </div>
        </div>

        <div class="button-group">
          <button v-for="move in currentCharacter.specialMoves" :key="move.id" @click="addMove(move)"
            class="move-btn special">
            {{ move.label }}
          </button>
          <button v-for="move in currentCharacter.superMoves" :key="move.id" @click="addMove(move)"
            class="move-btn super">
            {{ move.label }}
          </button>
        </div>
      </div>

      <div class="palette-section">
        <h3>システム</h3>
        <div class="button-group">
          <button v-for="move in systemMoves" :key="move.id" @click="addMove(move)" class="move-btn system">
            {{ move.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue' // ⭐️ watchを追加
import draggable from 'vuedraggable'
import {
  type Move,
  standNormalMoves,    // ⭐️ 追加
  crouchNormalMoves,   // ⭐️ 追加
  jumpNormalMoves,     // ⭐️ 追加, 
  systemMoves,
  characters
} from '../data/characters'

interface ComboItem extends Move {
  uid: number
  annotation?: string
}

// ⭐️ Local Storageの保存用キー名
const STORAGE_KEY_CHAR = 'sf6_combo_editor_character'
const STORAGE_KEY_COMBO = 'sf6_combo_editor_combo'

// --- 1. 初期化（保存されたデータを読み込む） ---

// キャラクターの復元
const savedChar = localStorage.getItem(STORAGE_KEY_CHAR)
// 保存されていればそれを、なければ初期値（C.ヴァイパー）をセット
const selectedCharacterId = ref<string>(savedChar || 'cviper')

// コンボの復元
let initialCombo: ComboItem[] = []
const savedCombo = localStorage.getItem(STORAGE_KEY_COMBO)
if (savedCombo) {
  try {
    initialCombo = JSON.parse(savedCombo) // 文字列から配列に戻す
  } catch (e) {
    console.error('コンボデータの復元に失敗しました', e)
  }
}
const combo = ref<ComboItem[]>(initialCombo)

// 強度指定用の変数（これは一時的なものなので保存しなくてOK）
const strength = ref<string>('')

const quickTags = ['カウンター', 'パニカン', '画面端', 'ラッシュ', 'DRキャンセル', '最大溜め']
const lastSelectedUid = ref<number | null>(null)

const selectItem = (uid: number) => {
  lastSelectedUid.value = uid
}

const applyTag = (tag: string) => {
  if (lastSelectedUid.value === null && combo.value.length > 0) {
    lastSelectedUid.value = combo.value[combo.value.length - 1]?.uid ?? null;
  }
  const item = combo.value.find(m => m.uid === lastSelectedUid.value)
  if (item) {
    item.annotation = item.annotation ? `${item.annotation}, ${tag}` : tag
  }
}

// --- 2. 自動保存（データが変わった時に Local Storage を更新） ---

// キャラクターが変更されたら保存
watch(selectedCharacterId, (newVal) => {
  localStorage.setItem(STORAGE_KEY_CHAR, newVal)
})

// コンボ配列が変更されたら保存（deep: true をつけることで、要素の追加・削除・並び替えに反応します）
watch(combo, (newVal) => {
  localStorage.setItem(STORAGE_KEY_COMBO, JSON.stringify(newVal))
}, { deep: true })


// --- 以下、既存のロジック（そのまま） ---

const currentCharacter = computed(() => {
  return characters.find(c => c.id === selectedCharacterId.value) || characters[0]
})

const addMove = (move: Move): void => {
  let finalLabel = move.label
  if (move.category === 'special' && strength.value !== '') {
    finalLabel = `${strength.value}${move.label}`
  }

  combo.value.push({
    ...move,
    label: finalLabel,
    uid: Date.now(),
    annotation: '' // ⭐️ 初期化
  })
}
/*
const removeMove = (index: number): void => {
  combo.value.splice(index, 1)
}
  */

const clearCombo = (): void => {
  combo.value = []
}
const copyComboText = async (): Promise<void> => {
  if (combo.value.length === 0) return

  const charName = currentCharacter.value?.name || '不明なキャラクター'
  const comboText = combo.value.map(m => {
    return m.annotation ? `${m.label}(${m.annotation})` : m.label
  }).join(' > ')

  const fullText = `【${charName}】\n${comboText}`
  if (!navigator.clipboard) {
    alert('お使いの環境ではクリップボードへのコピーがサポートされていません。')
    return
  }

  try {
    await navigator.clipboard.writeText(fullText)
    alert(`コピーしました:\n\n${fullText}`)
  } catch (err) {
    console.error('コピーに失敗しました', err)
  }
}

const onCharacterChange = () => {
  if (combo.value.length > 0) {
    const confirmClear = confirm('キャラクターを変更すると現在のコンボがクリアされます。よろしいですか？')
    if (confirmClear) {
      clearCombo()
    }
  }
}
</script>

<style scoped>
.combo-builder {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1a2e;
  color: #e2e8f0;
  border-radius: 8px;
}

.title {
  text-align: center;
  color: #fca311;
  margin-bottom: 20px;
}

.character-select-area {
  margin-bottom: 20px;
  text-align: center;
}

.character-select-area select {
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 4px;
  background-color: #0f3460;
  color: white;
  border: 1px solid #4a4e69;
  outline: none;
  cursor: pointer;
}

.combo-display-area {
  min-height: 100px;
  background-color: #16213e;
  border: 2px dashed #4a4e69;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  overflow-x: auto;
}

.empty-text {
  color: #8d99ae;
  margin: 0 auto;
}

/* ⭐️ ドラッグエリアを横幅いっぱいに広げる */
.combo-sequence {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 0;
  /* 矢印をCSSにしたため、横のgapは0にして余白で調整します */
  align-items: center;
  width: 100%;
  min-height: 40px;
}

.combo-item {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: grab;
  /* ⭐️ ドラッグできることを示すカーソル */
  user-select: none;
  display: flex;
  align-items: center;
}

.combo-item:active {
  cursor: grabbing;
  /* ⭐️ ドラッグ中は掴んでいるカーソルに */
}

/* ⭐️ 矢印をCSSで自動付与する仕組み（最後以外の要素につく） */
.combo-item:not(:last-child)::after {
  content: '▶';
  margin: 0 10px;
  color: #fff;
  font-size: 12px;
  pointer-events: none;
  /* マウスイベントを邪魔しないようにする */
}

/* ⭐️ ドラッグ中（浮いている元の場所）のスタイル */
.ghost {
  opacity: 0.4;
  filter: grayscale(100%);
}

.normal {
  background-color: #3a86ff;
  color: white;
}

.unique {
  background-color: #20b2aa;
  color: white;
}

.special {
  background-color: #ff006e;
  color: white;
}

.super {
  background-color: #ffbe0b;
  color: #000;
}

.system {
  background-color: #8338ec;
  color: white;
}

.controls {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.clear-btn {
  background-color: #e63946;
  color: white;
}

.copy-btn {
  background-color: #2a9d8f;
  color: white;
}

.palette {
  background-color: #0f3460;
  padding: 20px;
  border-radius: 8px;
}

.palette-section {
  margin-bottom: 20px;
}

.special-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #4a4e69;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.palette-section h3 {
  margin: 0;
  font-size: 1rem;
}

.palette-section>h3 {
  border-bottom: 1px solid #4a4e69;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.special-header h3 {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.strength-modifier {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
}

.mod-btn {
  background-color: #1a1a2e;
  color: #8d99ae;
  border: 1px solid #4a4e69;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.mod-btn.active {
  background-color: #e2e8f0;
  color: #1a1a2e;
}

.mod-btn.od.active {
  background-color: #fca311;
  color: #1a1a2e;
  border-color: #fca311;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.move-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: filter 0.2s;
}

.move-btn:hover {
  filter: brightness(1.2);
}

.sub-section {
  margin-bottom: 15px;
  padding-left: 10px;
  border-left: 3px solid #3a86ff;
  /* 通常技カラーの青い線を左に引く */
}

.sub-header {
  font-size: 0.9rem;
  color: #8d99ae;
  margin: 0 0 8px 0;
}

.combo-item-container {
  display: flex;
  align-items: center;
}

.combo-item {
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  min-width: 100px;
  /* ...既存のスタイルに合わせる */
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.move-label {
  font-size: 0.95rem;
}

/* ⭐️ メモ入力欄のスタイル */
.annotation-input {
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: #fca311;
  font-size: 0.75rem;
  padding: 2px 4px;
  border-radius: 2px;
  outline: none;
  width: 100%;
}

.annotation-input:focus {
  border-bottom-color: #fca311;
  background: rgba(0, 0, 0, 0.5);
}

.annotation-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.quick-tags-area {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0 20px 0;
  padding: 10px;
  background-color: #0f3460;
  border-radius: 8px;
  border: 1px solid #4a4e69;
}

.tags-label {
  font-size: 0.85rem;
  font-weight: bold;
  color: #fca311;
  white-space: nowrap;
}

.tag-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-btn {
  background-color: #16213e;
  color: #e2e8f0;
  border: 1px solid #4a4e69;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tag-btn:hover {
  background-color: #3a86ff;
  border-color: #3a86ff;
}

.combo-item.is-selected {
  outline: 2px solid #fca311;
  box-shadow: 0 0 10px rgba(252, 163, 17, 0.5);
}
</style>