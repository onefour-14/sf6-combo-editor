# SF6 Combo Editor

ストリートファイター6（SF6）のコンボを直感的に作成・編集・共有するためのWebツールです。
全キャラクターの技データを網羅しており、ドラッグ＆ドロップによる並び替えや、SNS共有用のテキストコピー機能を備えています。

## 🚀 主な機能

- **全キャラクター対応**: Year 1〜Year 3（C.ヴァイパー等）を含む全キャラの技データを収録。
- **直感的なエディタ**: パレットから技を選ぶだけでコンボを作成。ドラッグ＆ドロップで順番を自由に入れ替え可能。
- **強度指定システム**: 必殺技に対して「弱・中・強・OD」をワンタップで切り替えて入力。
- **自動保存機能**: ブラウザの Local Storage を使用し、リロードしても作成中のコンボや選択キャラを保持。
- **共有用出力**: Twitter(X)などにそのまま貼り付けられる形式でコンボをクリップボードにコピー。
- **レスポンシブ対応**: PCだけでなく、スマホでのコンボ検討にも最適化。

## 🛠 技術スタック

- **Frontend**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Library**: vuedraggable (Sortable.js)
- **Styling**: Scoped CSS (Modern Dark Theme)

## 📦 セットアップ・起動方法


# リポジトリをクローン
git clone [https://github.com/あなたのユーザー名/sf6-combo-editor.git](https://github.com/あなたのユーザー名/sf6-combo-editor.git)

# ディレクトリに移動
cd sf6-combo-editor

# 依存関係をインストール
npm install

# 開発用サーバーを起動
npm run dev

## 📂 プロジェクト構造
src/components/ComboEditor.vue: メインのUIおよびロジック

src/data/characters.ts: 全キャラクターの技・フレームデータ管理用ファイル

src/App.vue: ルートコンポーネント

## 🗺 今後のロードマップ（予定）
[ ] フレームデータ（発生・硬直・有利F）の表示・計算機能

[ ] コンボのダメージ計算ロジックの実装

[ ] コンボの画像書き出し（Canvas API）機能

[ ] 独自コンボレシピの保存・一覧表示機能