<template>
  <div class="combo-builder">
    <div class="header-actions">
      <button @click="showReleaseNotes = true" class="btn-sm release-notes-btn">更新履歴</button>
    </div>
    <h1 class="title">SF6 Combo Editor</h1>

    <div class="character-select-area">
      <label for="character-select">キャラクター選択: </label>
      <select id="character-select" v-model="selectedCharacterId" @change="onCharacterChange">
        <option v-for="char in characters" :key="char.id" :value="char.id">
          {{ char.name }}
        </option>
      </select>
    </div>

    <div class="combos-list">
      <div v-for="(combo) in combos" :key="combo.id" class="combo-wrapper"
        :class="{ 'is-active': activeComboId === combo.id }" @click="activateCombo(combo.id)">
        <div class="combo-header">
          <input v-model="combo.name" class="combo-name-input" placeholder="コンボ名" @click.stop />
          <div class="combo-actions">
            <button @click.stop="copyComboText(combo.id)" class="btn-sm copy-btn">コピー</button>
            <button @click.stop="clearCombo(combo.id)" class="btn-sm clear-btn">クリア</button>
            <button v-if="combos.length > 1" @click.stop="removeCombo(combo.id)" class="btn-sm remove-btn">削除</button>
          </div>
        </div>

        <div class="combo-display-area">
          <div v-if="combo.items.length === 0" class="empty-text">
            (技を追加してください)
          </div>

          <draggable v-model="combo.items" item-key="uid" class="combo-sequence" ghost-class="ghost" :animation="200">
            <template #item="{ element }">
              <div class="combo-item-container">
                <div class="combo-item" :class="[element.category, { 'is-selected': lastSelectedUid === element.uid }]"
                  @click.stop="selectItem(element.uid)">
                  <button class="remove-item-btn" @click.stop="removeItem(combo.id, element.uid)">×</button>
                  <div class="item-main">
                    <span class="move-label">{{ element.label }}</span>
                    <input v-model="element.annotation" placeholder="状況メモ..." class="annotation-input" @click.stop />
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <div class="global-controls">
      <button @click="addNewCombo" class="btn add-combo-btn">+ コンボを追加</button>
      <button @click="copyAllCombos" class="btn copy-all-btn" v-if="combos.length > 0">すべてコピー</button>
    </div>

    <div class="quick-tags-area">
      <span class="tags-label">クイックタグ:</span>
      <div class="tag-buttons">
        <button v-for="tag in quickTags" :key="tag" @click="applyTag(tag)" class="tag-btn">
          + {{ tag }}
        </button>
      </div>
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

    <!-- リリースノートモーダル -->
    <div v-if="showReleaseNotes" class="modal-overlay" @click="showReleaseNotes = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>更新履歴</h2>
          <button @click="showReleaseNotes = false" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div v-for="note in releaseNotes" :key="note.version" class="release-note-item">
            <div class="note-header">
              <span class="version">v{{ note.version }}</span>
              <span class="date">{{ note.date }}</span>
            </div>
            <ul class="note-list">
              <li v-for="(change, i) in note.changes" :key="i">{{ change }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="copyright">&copy; onefour-14</div>
      <a href="https://github.com/onefour-14/sf6-combo-editor" target="_blank" rel="noopener noreferrer" class="github-link">
        GitHub
      </a>
    </footer>
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

interface Combo {
  id: number
  items: ComboItem[]
  name: string
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
let initialCombos: Combo[] = []
const savedCombo = localStorage.getItem(STORAGE_KEY_COMBO)
if (savedCombo) {
  try {
    const parsed = JSON.parse(savedCombo)
    if (Array.isArray(parsed)) {
      // 旧データ(ComboItem[])か新データ(Combo[])かの判定
      if (parsed.length > 0 && 'items' in parsed[0]) {
        initialCombos = parsed.map((c, i) => ({
          ...c,
          name: c.name || `Combo ${i + 1}`
        }))
      } else if (parsed.length > 0) {
        // 旧データを移行
        initialCombos = [{ id: Date.now(), items: parsed, name: 'Combo 1' }]
      }
    }
  } catch (e) {
    console.error('コンボデータの復元に失敗しました', e)
  }
}
if (initialCombos.length === 0) {
  initialCombos = [{ id: Date.now(), items: [], name: 'Combo 1' }]
}
const combos = ref<Combo[]>(initialCombos)
const activeComboId = ref<number>(combos.value[0]?.id ?? 0)

// 強度指定用の変数（これは一時的なものなので保存しなくてOK）
const strength = ref<string>('')

const quickTags = ['カウンター', 'パニカン', '画面端', 'ラッシュ', 'DRキャンセル', '最大溜め']

const showReleaseNotes = ref(false)
const releaseNotes = [
  {
    version: '1.4.0',
    date: '2026-03-03',
    changes: [
      'コンボアイテムごとの削除ボタンを追加',
      '複数コンボの一括コピー機能を追加',
      'コンボ名の編集機能を追加',
      'システム技に投げ（前/後ろ）を追加',
      'フッターにGitHubリンクを追加'
    ]
  },
  {
    version: '1.3.0',
    date: '2026-03-02',
    changes: [
      '複数のコンボレシピを管理できる機能を追加',
      'コンボアイテムの表示サイズを調整',
      'キャラクターデータの追加・修正'
    ]
  },
  {
    version: '1.2.0',
    date: '2026-03-01',
    changes: [
      '技を追加した際に自動的に選択状態にする機能を追加',
      'コンボのテキストコピー機能の改善'
    ]
  },
  {
    version: '1.0.0',
    date: '2026-02-20',
    changes: [
      '初回リリース'
    ]
  }
]

const lastSelectedUid = ref<number | null>(null)

/**
 * コンボアイテムを選択状態にします。
 *
 * @param uid - 選択するアイテムの一意なID
 */
const selectItem = (uid: number) => {
  lastSelectedUid.value = uid
  // 選択されたアイテムを含むコンボをアクティブにする
  const foundCombo = combos.value.find(c => c.items.some(item => item.uid === uid))
  if (foundCombo) {
    activeComboId.value = foundCombo.id
  }
}

/**
 * 選択中のコンボアイテムにタグ（注釈）を追加します。
 * アイテムが選択されていない場合は、リストの最後のアイテムを対象とします。
 *
 * @param tag - 追加するタグのテキスト
 */
const applyTag = (tag: string) => {
  if (lastSelectedUid.value === null) {
    const activeCombo = combos.value.find(c => c.id === activeComboId.value)
    const lastItem = activeCombo?.items[activeCombo.items.length - 1]
    if (lastItem) {
      lastSelectedUid.value = lastItem.uid
    }
  }
  
  for (const combo of combos.value) {
    const item = combo.items.find(m => m.uid === lastSelectedUid.value)
    if (item) {
      item.annotation = item.annotation ? `${item.annotation}, ${tag}` : tag
      return
    }
  }
}

// --- 2. 自動保存（データが変わった時に Local Storage を更新） ---

// キャラクターが変更されたら保存
watch(selectedCharacterId, (newVal) => {
  localStorage.setItem(STORAGE_KEY_CHAR, newVal)
})

// コンボ配列が変更されたら保存（deep: true をつけることで、要素の追加・削除・並び替えに反応します）
watch(combos, (newVal) => {
  localStorage.setItem(STORAGE_KEY_COMBO, JSON.stringify(newVal))
}, { deep: true })

/**
 * 現在選択されているキャラクターのデータオブジェクトを返します。
 *
 * @returns キャラクターオブジェクト
 */
const currentCharacter = computed(() => {
  return characters.find(c => c.id === selectedCharacterId.value) || characters[0]
})

/**
 * コンボリストに新しい技を追加します。
 * 必殺技の場合は、現在設定されている強度（弱・中・強・OD）をラベルに付与します。
 *
 * @param move - 追加する技のデータオブジェクト
 */
const addMove = (move: Move): void => {
  let finalLabel = move.label
  if (move.category === 'special' && strength.value !== '') {
    finalLabel = `${strength.value}${move.label}`
  }

  const targetCombo = combos.value.find(c => c.id === activeComboId.value)
  if (!targetCombo) return

  const newItemUid = Date.now()
  targetCombo.items.push({
    ...move,
    label: finalLabel,
    uid: newItemUid,
    annotation: '' // ⭐️ 初期化
  })
  selectItem(newItemUid)
}

/**
 * 現在のコンボリストを全てクリアします。
 */
const clearCombo = (comboId?: number): void => {
  const targetId = comboId ?? activeComboId.value
  const targetCombo = combos.value.find(c => c.id === targetId)
  if (targetCombo) {
    targetCombo.items = []
  }
}

/**
 * 指定したコンボから特定のアイテムを削除します。
 */
const removeItem = (comboId: number, itemUid: number) => {
  const combo = combos.value.find(c => c.id === comboId)
  if (combo) {
    const index = combo.items.findIndex(item => item.uid === itemUid)
    if (index !== -1) {
      combo.items.splice(index, 1)
      if (lastSelectedUid.value === itemUid) {
        lastSelectedUid.value = null
      }
    }
  }
}

/**
 * 現在のコンボレシピをテキスト形式でクリップボードにコピーします。
 * 各技は " > " で連結され、注釈がある場合は括弧書きで付記されます。
 *
 * @returns コピー処理のPromise
 */
const copyComboText = async (comboId?: number): Promise<void> => {
  const targetId = comboId ?? activeComboId.value
  const targetCombo = combos.value.find(c => c.id === targetId)
  if (!targetCombo || targetCombo.items.length === 0) return

  const charName = currentCharacter.value?.name || '不明なキャラクター'
  const comboText = targetCombo.items.map(m => {
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

/**
 * すべてのコンボレシピをまとめてクリップボードにコピーします。
 */
const copyAllCombos = async (): Promise<void> => {
  const charName = currentCharacter.value?.name || '不明なキャラクター'
  const validCombos = combos.value.filter(c => c.items.length > 0)

  if (validCombos.length === 0) {
    alert('コピーするコンボがありません。')
    return
  }

  let fullText = `【${charName}】`
  
  validCombos.forEach(combo => {
    //const index = combos.value.findIndex(c => c.id === combo.id)
    const comboText = combo.items.map(m => {
      return m.annotation ? `${m.label}(${m.annotation})` : m.label
    }).join(' > ')
    fullText += `\n\n[${combo.name}]\n${comboText}`
  })

  if (!navigator.clipboard) {
    alert('お使いの環境ではクリップボードへのコピーがサポートされていません。')
    return
  }

  try {
    await navigator.clipboard.writeText(fullText)
    alert(`すべてのコンボをコピーしました`)
  } catch (err) {
    console.error('コピーに失敗しました', err)
  }
}

/**
 * 新しいコンボエリアを追加します。
 */
const addNewCombo = () => {
  const newId = Date.now()
  const newName = `Combo ${combos.value.length + 1}`
  combos.value.push({ id: newId, items: [], name: newName })
  activeComboId.value = newId
}

/**
 * 指定したコンボエリアを削除します。
 */
const removeCombo = (id: number) => {
  const index = combos.value.findIndex(c => c.id === id)
  if (index !== -1) {
    combos.value.splice(index, 1)
    if (activeComboId.value === id) {
      activeComboId.value = combos.value[Math.max(0, index - 1)]?.id ?? 0
    }
  }
}

const activateCombo = (id: number) => {
  activeComboId.value = id
}

/**
 * キャラクター選択が変更された際のイベントハンドラです。
 * 既存のコンボがある場合、クリアするかどうかの確認ダイアログを表示します。
 */
const onCharacterChange = () => {
  const hasItems = combos.value.some(c => c.items.length > 0)
  if (hasItems) {
    const confirmClear = confirm('キャラクターを変更すると現在のコンボがクリアされます。よろしいですか？')
    if (confirmClear) {
      combos.value = [{ id: Date.now(), items: [], name: 'Combo 1' }]
      activeComboId.value = combos.value[0]?.id ?? 0
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
  position: relative;
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

.combos-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.combo-wrapper {
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 10px;
  background-color: #16213e;
  transition: border-color 0.2s;
}

.combo-wrapper.is-active {
  border-color: #fca311;
  background-color: #1f2b4d;
}

.combo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 5px;
}

.combo-name-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  color: #fca311;
  font-weight: bold;
  font-size: 1rem;
  padding: 2px 4px;
  outline: none;
  transition: border-color 0.2s;
}

.combo-name-input:focus {
  border-bottom-color: #fca311;
}

.combo-actions {
  display: flex;
  gap: 8px;
}

.combo-display-area {
  min-height: 100px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px dashed #4a4e69;
  border-radius: 8px;
  padding: 20px;
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
  padding: 5px 10px;
  min-width: 40px;
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
.combo-item-container:not(:last-child)::after {
  content: '▶';
  margin: 0 3px;
  color: #fff;
  font-size: 9px;
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
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 4px 8px;
  min-width: 60px;
  /* ...既存のスタイルに合わせる */
}

/* ⭐️ アイテム削除ボタン */
.remove-item-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ef476f;
  color: white;
  border: 2px solid #16213e;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.2s;
}

.combo-item:hover .remove-item-btn,
.combo-item.is-selected .remove-item-btn {
  opacity: 1;
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.move-label {
  font-size: 0.6rem;
}

/* ⭐️ メモ入力欄のスタイル */
.annotation-input {
  background: rgba(0, 0, 0, 0.3);
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: #fca311;
  font-size: 0.5rem;
  padding: 1px 2px;
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

.global-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.add-combo-btn {
  background-color: #3a86ff;
  color: white;
  flex: 1;
  padding: 12px;
}

.copy-all-btn {
  background-color: #2a9d8f;
  color: white;
  flex: 1;
  padding: 12px;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.copy-btn { background-color: #2a9d8f; }
.clear-btn { background-color: #e63946; }
.remove-btn { background-color: #6c757d; }

.copy-btn:hover, .clear-btn:hover, .remove-btn:hover {
  filter: brightness(1.1);
}

.header-actions {
  position: absolute;
  top: 20px;
  right: 20px;
}

.release-notes-btn {
  background-color: #4a4e69;
  color: #e2e8f0;
}

.release-notes-btn:hover {
  background-color: #5c6185;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1a1a2e;
  border: 1px solid #4a4e69;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #4a4e69;
  background-color: #0f3460;
  border-radius: 8px 8px 0 0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #fca311;
}

.close-btn {
  background: none;
  border: none;
  color: #8d99ae;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: #e2e8f0;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
}

.release-note-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #2e2e4d;
  padding-bottom: 15px;
}

.release-note-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.note-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.version {
  font-weight: bold;
  color: #3a86ff;
}

.date {
  color: #8d99ae;
  font-size: 0.9rem;
}

.note-list {
  margin: 0;
  padding-left: 20px;
  color: #e2e8f0;
}

.note-list li {
  margin-bottom: 4px;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  margin-top: 40px;
  color: #8d99ae;
  font-size: 0.8rem;
  border-top: 1px solid #4a4e69;
  padding-top: 20px;
}

.github-link {
  color: #8d99ae;
  text-decoration: none;
  transition: color 0.2s;
}

.github-link:hover {
  color: #fca311;
}
</style>