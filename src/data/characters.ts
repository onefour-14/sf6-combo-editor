// --- 型定義 ---
export type MoveCategory = 'normal' | 'special' | 'super' | 'system' | 'unique'

export interface Move {
  id: string
  label: string
  category: MoveCategory
}

export interface Character {
  id: string
  name: string
  uniqueMoves: Move[] // 特殊技・ターゲットコンボ用に追加！
  specialMoves: Move[]
  superMoves: Move[]
}
// --- 共通データ（ここを3つに分割して差し替え） ---
export const standNormalMoves: Move[] = [
  { id: 'lp', label: '立ち弱P', category: 'normal' },
  { id: 'mp', label: '立ち中P', category: 'normal' },
  { id: 'hp', label: '立ち強P', category: 'normal' },
  { id: 'lk', label: '立ち弱K', category: 'normal' },
  { id: 'mk', label: '立ち中K', category: 'normal' },
  { id: 'hk', label: '立ち強K', category: 'normal' },
]

export const crouchNormalMoves: Move[] = [
  { id: '2lp', label: 'しゃがみ弱P', category: 'normal' },
  { id: '2lk', label: 'しゃがみ弱K', category: 'normal' },
  { id: '2mp', label: 'しゃがみ中P', category: 'normal' },
  { id: '2mk', label: 'しゃがみ中K', category: 'normal' },
  { id: '2hp', label: 'しゃがみ強P', category: 'normal' },
  { id: '2hk', label: 'しゃがみ強K(大足)', category: 'normal' },
]

export const jumpNormalMoves: Move[] = [
  { id: 'jlp', label: 'ジャンプ弱P', category: 'normal' },
  { id: 'jlk', label: 'ジャンプ弱K', category: 'normal' },
  { id: 'jmp', label: 'ジャンプ中P', category: 'normal' },
  { id: 'jmk', label: 'ジャンプ中K', category: 'normal' },
  { id: 'jhp', label: 'ジャンプ強P', category: 'normal' },
  { id: 'jhk', label: 'ジャンプ強K', category: 'normal' },
]
// ------------------------------------------------

export const systemMoves: Move[] = [
  { id: 'dr', label: '生ラッシュ', category: 'system' },
  { id: 'cdr', label: 'キャンセルラッシュ', category: 'system' },
  { id: 'parry', label: 'パリィ', category: 'system' },
  { id: 'di', label: 'ドライブインパクト', category: 'system' },
  { id: 'dp', label: 'ドライブリバーサル', category: 'system' },
]

// --- キャラクター別データ（第1弾: 完全版） ---
export const characters: Character[] = [
  {
    id: 'ryu',
    name: 'リュウ',
    uniqueMoves: [
      { id: 'ryu_6mp', label: '鎖骨割り (6MP)', category: 'unique' },
      { id: 'ryu_6hp', label: '大外回し蹴り (6HP)', category: 'unique' },
      { id: 'ryu_4hp', label: '不抜 (4HP)', category: 'unique' },
      { id: 'ryu_6hk', label: '旋風脚 (6HK)', category: 'unique' },
      { id: 'ryu_tc1', label: '上段二連撃 (HP > HK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'ryu_hadou', label: '波動拳 (236P)', category: 'special' },
      { id: 'ryu_shoryu', label: '昇龍拳 (623P)', category: 'special' },
      { id: 'ryu_tatsu', label: '竜巻旋風脚 (214K)', category: 'special' },
      { id: 'ryu_hasho', label: '波掌撃 (214P)', category: 'special' },
      { id: 'ryu_denjin', label: '電刃錬気 (22P)', category: 'special' },
      { id: 'ryu_kuchu_tatsu', label: '空中竜巻旋風脚 (空中214K)', category: 'special' },
    ],
    superMoves: [
      { id: 'ryu_sa1', label: 'SA1: 真空波動拳', category: 'super' },
      { id: 'ryu_sa2', label: 'SA2: 真・波掌撃', category: 'super' },
      { id: 'ryu_sa3', label: 'SA3: 真・昇龍拳', category: 'super' },
    ]
  },
  {
    id: 'ken',
    name: 'ケン',
    uniqueMoves: [
      { id: 'ken_6mk', label: '踏み込み前蹴り (6MK)', category: 'unique' },
      { id: 'ken_6hk', label: '紫電カカト落とし (6HK)', category: 'unique' },
      { id: 'ken_tc1', label: '顎撥二連 (MP > HP)', category: 'unique' },
      { id: 'ken_tc2', label: '奮迅脚連携 (MK > HK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'ken_hadou', label: '波動拳 (236P)', category: 'special' },
      { id: 'ken_shoryu', label: '昇龍拳 (623P)', category: 'special' },
      { id: 'ken_tatsu', label: '竜巻旋風脚 (214K)', category: 'special' },
      { id: 'ken_kuchu_tatsu', label: '空中竜巻旋風脚 (空中214K)', category: 'special' },
      { id: 'ken_jinrai', label: '迅雷脚 (236K)', category: 'special' },
      { id: 'ken_ryubi', label: '龍尾脚 (623K)', category: 'special' },
      { id: 'ken_run', label: '奮迅脚 (KK)', category: 'special' },
    ],
    superMoves: [
      { id: 'ken_sa1', label: 'SA1: 龍尾烈火', category: 'super' },
      { id: 'ken_sa2', label: 'SA2: 疾風迅雷脚', category: 'super' },
      { id: 'ken_sa3', label: 'SA3: 神龍烈破', category: 'super' },
    ]
  },
  {
    id: 'luke',
    name: 'ルーク',
    uniqueMoves: [
      { id: 'luke_6mp', label: 'アウトローキック (6MP)', category: 'unique' },
      { id: 'luke_6hp', label: 'サプレッサー (6HP)', category: 'unique' },
      { id: 'luke_4hp', label: 'スアトカマー (4HP)', category: 'unique' },
      { id: 'luke_6hk', label: 'ノーズブレイカー (6HK)', category: 'unique' },
      { id: 'luke_tc1', label: 'トリプルインパクト (LP > LP > LP)', category: 'unique' },
      { id: 'luke_tc2', label: 'スナップバックコンボ (MP > MP > MP > MP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'luke_sand', label: 'サンドブラスト (236P)', category: 'special' },
      { id: 'luke_rising', label: 'ライジングアッパー (623P)', category: 'special' },
      { id: 'luke_avenger', label: 'アベンジャー (214P)', category: 'special' },
      { id: 'luke_flash', label: 'フラッシュナックル (214K)', category: 'special' },
      { id: 'luke_aerial_flash', label: '空中フラッシュナックル (空中214K)', category: 'special' },
    ],
    superMoves: [
      { id: 'luke_sa1', label: 'SA1: バルカンブラスト', category: 'super' },
      { id: 'luke_sa2', label: 'SA2: イレイザー', category: 'super' },
      { id: 'luke_sa3', label: 'SA3: ペイルライダー', category: 'super' },
    ]
  },
  {
    id: 'cviper',
    name: 'C.ヴァイパー',
    uniqueMoves: [
      { id: 'cviper_6mp', label: 'オーバーグロー (6MP)', category: 'unique' },
      { id: 'cviper_3hk', label: 'ダブルキック (3HK)', category: 'unique' },
      { id: 'cviper_hj', label: 'ハイジャンプ (2 > 8)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'cviper_tk', label: 'サンダーナックル (214P)', category: 'special' },
      { id: 'cviper_bk', label: 'バーニングキック (214K)', category: 'special' },
      { id: 'cviper_kuchu_bk', label: '空中バーニングキック (空中214K)', category: 'special' },
      { id: 'cviper_sh', label: 'セイスモハンマー (623P)', category: 'special' },
    ],
    superMoves: [
      { id: 'cviper_sa1', label: 'SA1: エマージェンシーコンビネーション', category: 'super' },
      { id: 'cviper_sa2', label: 'SA2: バーストタイム', category: 'super' },
      { id: 'cviper_sa3', label: 'SA3: バーニングダンス', category: 'super' },
    ]
  },
// --- ここから差し替え ---
  {
    id: 'chunli',
    name: '春麗',
    uniqueMoves: [
      { id: 'chunli_4mp', label: '追突拳 (4 or 6MP)', category: 'unique' },
      { id: 'chunli_3hk', label: '鶴脚落 (3 or 6HK)', category: 'unique' },
      { id: 'chunli_j2mk', label: '鷹爪脚 (空中2MK)', category: 'unique' },
      { id: 'chunli_tc1', label: '行雲流水 (214P) 派生', category: 'unique' },
    ],
    specialMoves: [
      { id: 'chunli_kikou', label: '気功拳 (4溜め6P)', category: 'special' },
      { id: 'chunli_hyakuretsu', label: '百裂脚 (236K)', category: 'special' },
      { id: 'chunli_kuchu_hyakuretsu', label: '空中百裂脚 (空中236K)', category: 'special' },
      { id: 'chunli_spibird', label: 'スピニングバードキック (2溜め8K)', category: 'special' },
      { id: 'chunli_tensho', label: '天昇脚 (22K)', category: 'special' },
      { id: 'chunli_stance', label: '行雲流水 (214P)', category: 'special' },
    ],
    superMoves: [
      { id: 'chunli_sa1', label: 'SA1: 氣功掌', category: 'super' },
      { id: 'chunli_sa2', label: 'SA2: 鳳翼扇', category: 'super' },
      { id: 'chunli_sa3', label: 'SA3: 蒼天流星', category: 'super' },
    ]
  },
  {
    id: 'cammy',
    name: 'キャミィ',
    uniqueMoves: [
      { id: 'cammy_4mp', label: 'リフトアッパー (4MP)', category: 'unique' },
      { id: 'cammy_4hk', label: 'ディレイディスチャージ (4HK)', category: 'unique' },
      { id: 'cammy_tc1', label: 'スイングコンビネーション (HP > HK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'cammy_spiral', label: 'スパイラルアロー (236K)', category: 'special' },
      { id: 'cammy_cannon', label: 'キャノンスパイク (623K)', category: 'special' },
      { id: 'cammy_strike', label: 'キャノンストライク (空中214K)', category: 'special' },
      { id: 'cammy_hooligan', label: 'フーリガンコンビネーション (214P)', category: 'special' },
      { id: 'cammy_axel', label: 'アクセルスピンナックル (214P or 214K)', category: 'special' },
    ],
    superMoves: [
      { id: 'cammy_sa1', label: 'SA1: スピンドライブスマッシャー', category: 'super' },
      { id: 'cammy_sa2', label: 'SA2: キラービースピン', category: 'super' },
      { id: 'cammy_sa3', label: 'SA3: デルタレッドアサルト', category: 'super' },
    ]
  },
  {
    id: 'juri',
    name: 'ジュリ',
    uniqueMoves: [
      { id: 'juri_6mk', label: '閃回脚 (6MK)', category: 'unique' },
      { id: 'juri_6hk', label: '殺空脚 (6HK)', category: 'unique' },
      { id: 'juri_tc1', label: '死連閃 (MP > 4HP / 6HP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'juri_fuhajin', label: '風破刃 (214K)', category: 'special' },
      { id: 'juri_saihasho', label: '歳破衝 (236P)', category: 'special' },
      { id: 'juri_ankensatsu', label: '暗剣殺 (236K)', category: 'special' },
      { id: 'juri_goansatsu', label: '五黄殺 (236K)', category: 'special' },
      { id: 'juri_tensenrin', label: '天穿輪 (623P)', category: 'special' },
      { id: 'juri_shikkusen', label: '疾空閃 (空中214K)', category: 'special' },
    ],
    superMoves: [
      { id: 'juri_sa1', label: 'SA1: 殺界風破斬', category: 'super' },
      { id: 'juri_sa2', label: 'SA2: 風水エンジン', category: 'super' },
      { id: 'juri_sa3', label: 'SA3: 回旋断界落', category: 'super' },
    ]
  },
  {
    id: 'zangief',
    name: 'ザンギエフ',
    uniqueMoves: [
      { id: 'zan_6hp', label: 'ヘッドバット (6HP)', category: 'unique' },
      { id: 'zan_3hp', label: 'マシンガンチョップ (3HP)', category: 'unique' },
      { id: 'zan_6hk', label: 'ステップキック (6HK)', category: 'unique' },
      { id: 'zan_j2hp', label: 'フライングボディプレス (空中2HP)', category: 'unique' },
      { id: 'zan_j2mk', label: 'フライングクロスチョップ (空中2MK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'zan_spd', label: 'スクリューパイルドライバー (一回転P)', category: 'special' },
      { id: 'zan_borscht', label: 'ボルシチダイナマイト (空中一回転K)', category: 'special' },
      { id: 'zan_lariat', label: 'ダブルラリアット (PP)', category: 'special' },
      { id: 'zan_siberian', label: 'シベリアンエクスプレス (63214K)', category: 'special' },
      { id: 'zan_tundra', label: 'ツンドラストーム (22HK)', category: 'special' },
    ],
    superMoves: [
      { id: 'zan_sa1', label: 'SA1: エリアルロシアンスラム', category: 'super' },
      { id: 'zan_sa2', label: 'SA2: サイクロンラリアット', category: 'super' },
      { id: 'zan_sa3', label: 'SA3: ボリショイストームバスター', category: 'super' },
    ]
  },
  {
    id: 'guile',
    name: 'ガイル',
    uniqueMoves: [
      { id: 'guile_4lk', label: 'ニーバズーカ (4 or 6LK)', category: 'unique' },
      { id: 'guile_4mk', label: 'ローリングソバット (4 or 6MK)', category: 'unique' },
      { id: 'guile_4hp', label: 'スピニングバックナックル (6HP)', category: 'unique' },
      { id: 'guile_6hk', label: 'リバーススピンキック (6HK)', category: 'unique' },
      { id: 'guile_tc1', label: 'リコイルスプール (MP > 4HP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'guile_boom', label: 'ソニックブーム (4溜め6P)', category: 'special' },
      { id: 'guile_somersault', label: 'サマーソルトキック (2溜め8K)', category: 'special' },
      { id: 'guile_blade', label: 'ソニックブレイド (214P)', category: 'special' },
      { id: 'guile_cross', label: 'ソニッククロス (ブレイド後6P)', category: 'special' },
    ],
    superMoves: [
      { id: 'guile_sa1', label: 'SA1: ソニックハリケーン', category: 'super' },
      { id: 'guile_sa2', label: 'SA2: ソリッドパンチャー', category: 'super' },
      { id: 'guile_sa3', label: 'SA3: クロスファイアサマーソルト', category: 'super' },
    ]
  },
  {
    id: 'akuma',
    name: '豪鬼',
    uniqueMoves: [
      { id: 'akuma_6mp', label: '頭蓋殺 (6MP)', category: 'unique' },
      { id: 'akuma_4hp', label: '羅漢 (4HP)', category: 'unique' },
      { id: 'akuma_tc1', label: '鬼哭連斬 (6HK > HK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'akuma_gouhadou', label: '豪波動拳 (236P)', category: 'special' },
      { id: 'akuma_zankuu', label: '斬空波動拳 (空中236P)', category: 'special' },
      { id: 'akuma_goushouryu', label: '豪昇龍拳 (623P)', category: 'special' },
      { id: 'akuma_tatsu', label: '竜巻斬空脚 (214K)', category: 'special' },
      { id: 'akuma_kuchu_tatsu', label: '空中竜巻斬空脚 (空中214K)', category: 'special' },
      { id: 'akuma_hyakki', label: '百鬼襲 (236K)', category: 'special' },
      { id: 'akuma_ashura', label: '阿修羅閃空 (623P or K / 421P or K)', category: 'special' },
    ],
    superMoves: [
      { id: 'akuma_sa1', label: 'SA1: 滅殺豪波動', category: 'super' },
      { id: 'akuma_sa2', label: 'SA2: 崩天劫火', category: 'super' },
      { id: 'akuma_sa3', label: 'SA3: 禍坏 / 瞬獄殺', category: 'super' },
    ]
  },
// --- ここから差し替え ---
  {
    id: 'dj',
    name: 'ディージェイ',
    uniqueMoves: [
      { id: 'dj_j2lk', label: 'ニーショット (空中2LK)', category: 'unique' },
      { id: 'dj_6mk', label: 'サンライズヒール (6MK)', category: 'unique' },
      { id: 'dj_4hk', label: 'フェイスブレイカー (4HK)', category: 'unique' },
      { id: 'dj_tc1', label: 'スリービートコンボ (LP > LK > MK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'dj_airslasher', label: 'エアースラッシャー (4溜め6P)', category: 'special' },
      { id: 'dj_jackknife', label: 'ジャックナイフマキシマム (2溜め8K)', category: 'special' },
      { id: 'dj_sobat', label: 'ローリングソバット (236K)', category: 'special' },
      { id: 'dj_machinegun', label: 'マシンガンアッパー (214P)', category: 'special' },
      { id: 'dj_juscool', label: 'ジョスクール (214K)', category: 'special' },
    ],
    superMoves: [
      { id: 'dj_sa1', label: 'SA1: サマーソルトストライク', category: 'super' },
      { id: 'dj_sa2', label: 'SA2: サンライズフェスティバル', category: 'super' },
      { id: 'dj_sa3', label: 'SA3: ウィークエンド・タイム', category: 'super' },
    ]
  },
  {
    id: 'jp',
    name: 'JP',
    uniqueMoves: [
      { id: 'jp_6mk', label: 'ギルティカ (6MK)', category: 'unique' },
      { id: 'jp_4mp', label: 'トルノ (4MP)', category: 'unique' },
      { id: 'jp_6hp', label: 'マラカ (6HP)', category: 'unique' },
      { id: 'jp_3hk', label: 'ジラント (3HK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'jp_triglav', label: 'トリグラフ (22P)', category: 'special' },
      { id: 'jp_stribog', label: 'ストリボーグ (236P)', category: 'special' },
      { id: 'jp_departure', label: 'ヴィーハト (214P)', category: 'special' },
      { id: 'jp_amnesia', label: 'アムネジア (22K)', category: 'special' },
      { id: 'jp_embrace', label: 'アブニマーチ (623P)', category: 'special' },
    ],
    superMoves: [
      { id: 'jp_sa1', label: 'SA1: チェルノボーグ', category: 'super' },
      { id: 'jp_sa2', label: 'SA2: ラヴーシュカ', category: 'super' },
      { id: 'jp_sa3', label: 'SA3: ザプリェット', category: 'super' },
    ]
  },
  {
    id: 'marisa',
    name: 'マリーザ',
    uniqueMoves: [
      { id: 'marisa_3hp', label: 'マカイラ (3HP)', category: 'unique' },
      { id: 'marisa_6hp', label: 'ノウス (6HP)', category: 'unique' },
      { id: 'marisa_6hk', label: 'ファルクス (6HK)', category: 'unique' },
      { id: 'marisa_tc1', label: 'ライトツーコンボ (LP > LP)', category: 'unique' },
      { id: 'marisa_tc2', label: 'ミドルツーコンボ (MP > MP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'marisa_gladius', label: 'グラディウス (236P)', category: 'special' },
      { id: 'marisa_dimachaerus', label: 'ディマカイルス (214P)', category: 'special' },
      { id: 'marisa_phalanx', label: 'ファランクス (623P)', category: 'special' },
      { id: 'marisa_quadriga', label: 'クアドリガ (236K)', category: 'special' },
      { id: 'marisa_scutum', label: 'スクトゥム (214K)', category: 'special' },
    ],
    superMoves: [
      { id: 'marisa_sa1', label: 'SA1: ジャベリンオブマリーザ', category: 'super' },
      { id: 'marisa_sa2', label: 'SA2: メテオリティス', category: 'super' },
      { id: 'marisa_sa3', label: 'SA3: アポロゥーサ', category: 'super' },
    ]
  },
  {
    id: 'jamie',
    name: 'ジェイミー',
    uniqueMoves: [
      { id: 'jamie_4hk', label: '天晴脚 (4HK)', category: 'unique' },
      { id: 'jamie_6hk', label: '幻酔舞 (6HK)', category: 'unique' },
      { id: 'jamie_tc1', label: '落星脚 (LK > MK > HK)', category: 'unique' },
      { id: 'jamie_j2mk', label: '無影蹴 (空中2MK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'jamie_drink', label: '魔身 (22P)', category: 'special' },
      { id: 'jamie_rekka', label: '流酔拳 (236P)', category: 'special' },
      { id: 'jamie_palm', label: '酔疾歩 (214P)', category: 'special' },
      { id: 'jamie_dp', label: '張弓腿 (623K)', category: 'special' },
      { id: 'jamie_spin', label: '爆廻 (236K)', category: 'special' },
    ],
    superMoves: [
      { id: 'jamie_sa1', label: 'SA1: 武神呼砲・孤空 / 衝涼', category: 'super' },
      { id: 'jamie_sa2', label: 'SA2: 絶唱魔身', category: 'super' },
      { id: 'jamie_sa3', label: 'SA3: 月牙叉手', category: 'super' },
    ]
  },
  {
    id: 'kimberly',
    name: 'キンバリー',
    uniqueMoves: [
      { id: 'kim_6hk', label: '水遁の術 (6HK)', category: 'unique' },
      { id: 'kim_3mk', label: '風車 (3MK)', category: 'unique' },
      { id: 'kim_tc1', label: '武神虎連牙 (LP > MP > HP > HK)', category: 'unique' },
      { id: 'kim_tc2', label: '武神獄鎖拳 (LP > MP > 2HP > HK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'kim_tatsu', label: '武神旋風脚 (214K)', category: 'special' },
      { id: 'kim_run', label: '疾駆け (236K)', category: 'special' },
      { id: 'kim_bomb', label: '彩隠形 (22P)', category: 'special' },
      { id: 'kim_airgrab', label: '飛電カソク落とし (空中236P)', category: 'special' },
      { id: 'kim_nue', label: 'ヌエ捻り (214P)', category: 'special' },
    ],
    superMoves: [
      { id: 'kim_sa1', label: 'SA1: 武神乱拍子', category: 'super' },
      { id: 'kim_sa2', label: 'SA2: 武神天翔駆け', category: 'super' },
      { id: 'kim_sa3', label: 'SA3: 武神顕現神楽', category: 'super' },
    ]
  },
  {
    id: 'blanka',
    name: 'ブランカ',
    uniqueMoves: [
      { id: 'blanka_3hp', label: 'アマゾンリバーラン (3HP)', category: 'unique' },
      { id: 'blanka_6kk', label: 'サプライズフォワード (6KK)', category: 'unique' },
      { id: 'blanka_4kk', label: 'サプライズバック (4KK)', category: 'unique' },
      { id: 'blanka_tc1', label: 'ロッククラッシュ (6MP > 6MP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'blanka_thunder', label: 'エレクトリックサンダー (214P)', category: 'special' },
      { id: 'blanka_rolling', label: 'ローリングアタック (4溜め6P)', category: 'special' },
      { id: 'blanka_vertical', label: 'バーチカルローリング (2溜め8K)', category: 'special' },
      { id: 'blanka_backrolling', label: 'バックステップローリング (4溜め6K)', category: 'special' },
      { id: 'blanka_airrolling', label: 'エリアルローリング (空中4溜め6P)', category: 'special' },
      { id: 'blanka_wildhunt', label: 'ワイルドハント (236P)', category: 'special' },
    ],
    superMoves: [
      { id: 'blanka_sa1', label: 'SA1: シャウトオブアース', category: 'super' },
      { id: 'blanka_sa2', label: 'SA2: ライトニングビースト', category: 'super' },
      { id: 'blanka_sa3', label: 'SA3: グランドシェイブローリング', category: 'super' },
    ]
  },
  {
    id: 'dhalsim',
    name: 'ダルシム',
    uniqueMoves: [
      { id: 'dhalsim_4lp', label: 'ヨガアッパー (4LP)', category: 'unique' },
      { id: 'dhalsim_4mp', label: 'ヨガランス (4MP)', category: 'unique' },
      { id: 'dhalsim_1hp', label: 'ドリルズツキ (空中1HP)', category: 'unique' },
      { id: 'dhalsim_1k', label: 'ドリルキック (空中1K)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'dhalsim_fire', label: 'ヨガファイア (236P)', category: 'special' },
      { id: 'dhalsim_arch', label: 'ヨガアーチ (236K)', category: 'special' },
      { id: 'dhalsim_flame', label: 'ヨガフレイム (214P)', category: 'special' },
      { id: 'dhalsim_blast', label: 'ヨガブラスト (214K)', category: 'special' },
      { id: 'dhalsim_comet', label: 'ヨガコメット (空中214P)', category: 'special' },
      { id: 'dhalsim_teleport', label: 'ヨガテレポート (623 or 421 + 3P or 3K)', category: 'special' },
      { id: 'dhalsim_float', label: 'ヨガフロート (214KK or 空中214KK)', category: 'special' },
    ],
    superMoves: [
      { id: 'dhalsim_sa1', label: 'SA1: ヨガインフェルノ', category: 'super' },
      { id: 'dhalsim_sa2', label: 'SA2: ヨガサンバースト', category: 'super' },
      { id: 'dhalsim_sa3', label: 'SA3: ヨガマーカ', category: 'super' },
    ]
  },
  {
    id: 'ehonda',
    name: 'E.本田',
    uniqueMoves: [
      { id: 'honda_3hk', label: '四股踏み (3HK)', category: 'unique' },
      { id: 'honda_6hk', label: '払い蹴り (6HK)', category: 'unique' },
      { id: 'honda_tc1', label: '連ね張り手 (LP > MP)', category: 'unique' },
      { id: 'honda_tc2', label: '地鎮祭 (2LP > 2LP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'honda_harite', label: '百裂張り手 (214P)', category: 'special' },
      { id: 'honda_zuttsuki', label: 'スーパー頭突き (4溜め6P)', category: 'special' },
      { id: 'honda_hyakkan', label: 'スーパー百貫落とし (2溜め8K)', category: 'special' },
      { id: 'honda_oicho', label: '大銀杏投げ (63214P)', category: 'special' },
      { id: 'honda_teppou', label: '鉄砲 (22P)', category: 'special' },
    ],
    superMoves: [
      { id: 'honda_sa1', label: 'SA1: 猪突猛進', category: 'super' },
      { id: 'honda_sa2', label: 'SA2: 負けなし頭突き', category: 'super' },
      { id: 'honda_sa3', label: 'SA3: 千秋楽', category: 'super' },
    ]
  },
  {
    id: 'manon',
    name: 'マノン',
    uniqueMoves: [
      { id: 'manon_4hp', label: 'アラベスク (4HP)', category: 'unique' },
      { id: 'manon_3hp', label: 'グラン・フェッテ (3HP)', category: 'unique' },
      { id: 'manon_tc1', label: 'アン・ドゥ・トロワ (MP > MK > HK)', category: 'unique' },
      { id: 'manon_tc2', label: 'ア・テール (2HP > 2HP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'manon_manege', label: 'マネージュ・ドレ (63214P)', category: 'special' },
      { id: 'manon_renverse', label: 'ランヴェルセ (214P)', category: 'special' },
      { id: 'manon_degage', label: 'デガジェ (214K)', category: 'special' },
      { id: 'manon_rondement', label: 'ロンドマン (236K)', category: 'special' },
    ],
    superMoves: [
      { id: 'manon_sa1', label: 'SA1: アラベスク', category: 'super' },
      { id: 'manon_sa2', label: 'SA2: エトワール', category: 'super' },
      { id: 'manon_sa3', label: 'SA3: パ・ド・ドゥ', category: 'super' },
    ]
  },
  {
    id: 'lily',
    name: 'リリー',
    uniqueMoves: [
      { id: 'lily_6hp', label: 'ホーンブレイカー (6HP)', category: 'unique' },
      { id: 'lily_4hp', label: 'リッジライン (4HP)', category: 'unique' },
      { id: 'lily_3hp', label: 'グレートフット (3HP)', category: 'unique' },
      { id: 'lily_tc1', label: 'ダブルホーン (HP > HP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'lily_wind', label: 'コンドルウィンド (214P)', category: 'special' },
      { id: 'lily_spire', label: 'コンドルスパイア (236K)', category: 'special' },
      { id: 'lily_tomahawk', label: 'トマホークバスター (623P)', category: 'special' },
      { id: 'lily_dive', label: 'コンドルダイブ (空中2PP)', category: 'special' },
      { id: 'lily_typhoon', label: 'メキシカンタイフーン (63214P)', category: 'special' },
    ],
    superMoves: [
      { id: 'lily_sa1', label: 'SA1: ブリージングホーク', category: 'super' },
      { id: 'lily_sa2', label: 'SA2: サンダーバード', category: 'super' },
      { id: 'lily_sa3', label: 'SA3: レイジングタイフーン', category: 'super' },
    ]
  },
  {
    id: 'rashid',
    name: 'ラシード',
    uniqueMoves: [
      { id: 'rashid_6mp', label: 'フラップスピン (6MP)', category: 'unique' },
      { id: 'rashid_6hp', label: 'アサルトネイル (6HP)', category: 'unique' },
      { id: 'rashid_j2hp', label: '三角跳び (壁際で9)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'rashid_mixer', label: 'スピニングミキサー (236P)', category: 'special' },
      { id: 'rashid_eagle', label: 'イーグルスパイク (214K)', category: 'special' },
      { id: 'rashid_whirlwind', label: 'ワールウィンド・ショット (236K)', category: 'special' },
      { id: 'rashid_cyclone', label: 'アラビアンサイクロン (214P)', category: 'special' },
      { id: 'rashid_skyhigh', label: 'アラビアン・スカイハイ (空中236K)', category: 'special' },
    ],
    superMoves: [
      { id: 'rashid_sa1', label: 'SA1: スーパー・ラシード・キック', category: 'super' },
      { id: 'rashid_sa2', label: 'SA2: イウサール', category: 'super' },
      { id: 'rashid_sa3', label: 'SA3: アルタイル', category: 'super' },
    ]
  },
  {
    id: 'aki',
    name: 'A.K.I.',
    uniqueMoves: [
      { id: 'aki_6hp', label: '紫頭首 (6HP)', category: 'unique' },
      { id: 'aki_3hk', label: '連咬前蹴り (3HK)', category: 'unique' },
      { id: 'aki_4hk', label: '翻鬼襲 (4HK)', category: 'unique' },
      { id: 'aki_tc1', label: '蛇連撃 (LP > LP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'aki_shihousen', label: '紫泡泉 (236P)', category: 'special' },
      { id: 'aki_moudokuga', label: '猛毒牙 (214P)', category: 'special' },
      { id: 'aki_jakoukou', label: '蛇軽功 (236K)', category: 'special' },
      { id: 'aki_kyoushutsu', label: '凶襲突 (214K)', category: 'special' },
      { id: 'aki_ganjigarame', label: '雁字搦 (623P)', category: 'special' },
      { id: 'aki_akkidakou', label: '悪鬼蛇行 (214P)', category: 'special' },
    ],
    superMoves: [
      { id: 'aki_sa1', label: 'SA1: 死屍累々', category: 'super' },
      { id: 'aki_sa2', label: 'SA2: 紫煙裂爪', category: 'super' },
      { id: 'aki_sa3', label: 'SA3: 睚眦', category: 'super' },
    ]
  },
// --- ここから差し替え ---
  {
    id: 'ed',
    name: 'エド',
    uniqueMoves: [
      { id: 'ed_6mp', label: 'スイフトアッパー (6MP)', category: 'unique' },
      { id: 'ed_hp_hold', label: 'サイコナックル (HPホールド)', category: 'unique' },
      { id: 'ed_tc1', label: 'フリックコンビネーション (MP > HP)', category: 'unique' },
      { id: 'ed_tc2', label: 'ボディブローコンボ (2MP > 2MP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'ed_flicker', label: 'サイコフリッカー (236P)', category: 'special' },
      { id: 'ed_upper', label: 'サイコアッパー (623P)', category: 'special' },
      { id: 'ed_blitz', label: 'サイコブリッツ (214P)', category: 'special' },
      { id: 'ed_shoot', label: 'サイコシュート (236K)', category: 'special' },
      { id: 'ed_killstep', label: 'キルステップ (KK)', category: 'special' },
    ],
    superMoves: [
      { id: 'ed_sa1', label: 'SA1: サイコストーム', category: 'super' },
      { id: 'ed_sa2', label: 'SA2: サイコキャノン', category: 'super' },
      { id: 'ed_sa3', label: 'SA3: サイコチェンバー', category: 'super' },
    ]
  },
  {
    id: 'bison',
    name: 'ベガ',
    uniqueMoves: [
      { id: 'bison_6hp', label: 'デスアックス (6HP)', category: 'unique' },
      { id: 'bison_4hp', label: 'チョッピングサージェント (4HP)', category: 'unique' },
      { id: 'bison_3hk', label: 'スライディングキック (3HK)', category: 'unique' },
      { id: 'bison_j2mp', label: 'スカルドロップ (空中2MP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'bison_crusher', label: 'サイコクラッシャーアタック (4溜め6P)', category: 'special' },
      { id: 'bison_knee', label: 'ダブルニープレス (214K)', category: 'special' },
      { id: 'bison_backfist', label: 'バックフィストコンボ (214P)', category: 'special' },
      { id: 'bison_rise', label: 'シャドウライズ (22K)', category: 'special' },
      { id: 'bison_press', label: 'ヘッドプレス (ライズ中K)', category: 'special' },
      { id: 'bison_reverse', label: 'デビルリバース (ライズ中P)', category: 'special' },
    ],
    superMoves: [
      { id: 'bison_sa1', label: 'SA1: ニープレスナイトメア', category: 'super' },
      { id: 'bison_sa2', label: 'SA2: サイコパニッシャー', category: 'super' },
      { id: 'bison_sa3', label: 'SA3: アンリミテッドサイコクラッシャー', category: 'super' },
    ]
  },
  {
    id: 'terry',
    name: 'テリー',
    uniqueMoves: [
      { id: 'terry_3hp', label: 'ライジングアッパー (3HP)', category: 'unique' },
      { id: 'terry_6hp', label: 'ファストパンチ (6HP)', category: 'unique' },
      { id: 'terry_3hk', label: 'ファイヤーキック (3HK)', category: 'unique' },
      { id: 'terry_tc1', label: 'パッシングスウェー (HP > HK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'terry_wave', label: 'パワーウェイブ (236P)', category: 'special' },
      { id: 'terry_burn', label: 'バーンナックル (214P)', category: 'special' },
      { id: 'terry_crack', label: 'クラックシュート (214K)', category: 'special' },
      { id: 'terry_tackle', label: 'ライジングタックル (2溜め8P)', category: 'special' },
      { id: 'terry_charge', label: 'パワーチャージ (236K)', category: 'special' },
    ],
    superMoves: [
      { id: 'terry_sa1', label: 'SA1: バスターウルフ', category: 'super' },
      { id: 'terry_sa2', label: 'SA2: パワーゲイザー', category: 'super' },
      { id: 'terry_sa3', label: 'SA3: ライジングフォース', category: 'super' },
    ]
  },
  {
    id: 'mai',
    name: '舞',
    uniqueMoves: [
      { id: 'mai_3hk', label: '紅鶴の舞 (3HK)', category: 'unique' },
      { id: 'mai_6hk', label: '黒燕の舞 (6HK)', category: 'unique' },
      { id: 'mai_j2hp', label: '大輪風車落とし (空中2HP)', category: 'unique' },
      { id: 'mai_tc1', label: '風車崩し (LP > LK > HP)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'mai_kachosen', label: '花蝶扇 (236P)', category: 'special' },
      { id: 'mai_ryuenbu', label: '龍炎舞 (214P)', category: 'special' },
      { id: 'mai_hissatsu', label: '必殺忍蜂 (214K)', category: 'special' },
      { id: 'mai_musasabi', label: 'ムササビの舞 (空中214P)', category: 'special' },
      { id: 'mai_ukihane', label: '浮羽 (空中22K)', category: 'special' },
    ],
    superMoves: [
      { id: 'mai_sa1', label: 'SA1: 超必殺忍蜂', category: 'super' },
      { id: 'mai_sa2', label: 'SA2: 陽炎の舞', category: 'super' },
      { id: 'mai_sa3', label: 'SA3: 不知火流・九尾の狐', category: 'super' },
    ]
  },
  {
    id: 'elena',
    name: 'エレナ',
    uniqueMoves: [
      { id: 'elena_6mp', label: 'ハンドスタンドキック (6MP)', category: 'unique' },
      { id: 'elena_6hp', label: 'ラウンドアーチ (6HP)', category: 'unique' },
      { id: 'elena_3hk', label: 'スライディング (3HK)', category: 'unique' },
      { id: 'elena_tc1', label: 'カポエイラコンビネーション (MP > HK)', category: 'unique' },
    ],
    specialMoves: [
      { id: 'elena_mallet', label: 'マレットスマッシュ (236P)', category: 'special' },
      { id: 'elena_scratch', label: 'スクラッチホイール (623K)', category: 'special' },
      { id: 'elena_rhino', label: 'ライノホーン (214K)', category: 'special' },
      { id: 'elena_spin', label: 'スピンサイズ (236K)', category: 'special' },
      { id: 'elena_sylph', label: 'シルフアミュレット (22P)', category: 'special' },
    ],
    superMoves: [
      { id: 'elena_sa1', label: 'SA1: スピニングビート', category: 'super' },
      { id: 'elena_sa2', label: 'SA2: ブレイブダンス', category: 'super' },
      { id: 'elena_sa3', label: 'SA3: ヒーリング', category: 'super' },
    ]
  }
]