# FDTD-website
二次元電磁波シュミレーションをウェブサイト上で行えます。

https://smartdocs.me

<img src="https://user-images.githubusercontent.com/34999008/220603781-6c649d18-2751-4a1a-ad84-3294698746ef.gif"   width=600 height=300 >


# ご自身のPCで環境構築する手順

#### React_app,FDTDVideo,ServerSideフォルダーをご自身のPCにダウンロード
#### javaのIDEA環境　Intellijをインストール
 - https://www.jetbrains.com/idea/download/#section=windows
#### FDTDVideoフォルダーをintellijのプロジェクトにする
 - Intellijを開き、File-Project-Project-from-existing SourceでFDTDVideoを選択
#### FDTDVideoプロジェクトをjarファイルに変換する
 -  作成したFDTDVideo.jarをServer_Folderフォルダに入れてください
#### Apacheをインストール
 - DocumentRoot を　●●/react_documentに指定してください。
#### React_appのディレクトリに入り、npm run buildを実行し、buildフォルダの中に入っているファイルを apacheのDocumentRoot●●/react_documentに入れる
#### React_app/public/download.phpとFDTDVideoのFDTDVideoファイルを編集
 - ファイルのディレクトリをご自身のファイル構造に合わせる
### 完成！！

# React_app
 
React_appフォルダはReactのプロジェクトフォルダです。npm startコマンドのみで、電磁波シュミレーションサイトのUI部分を確認することができます。

# FDTDVideo

FDTDVideoフォルダはIntellijで開発を行ったjavaのプロジェクトフォルダです。

FDTDVideoの役割はユーザーの設定した情報をもとに、電磁波解析の計算を行い、mp4動画ファイルを作成することです。

FDTDVideoをjarファイルに変換して、Server_Folderフォルダに入れていください。

# Server_Side

Server_Sideフォルダはユーザーには直接触れさせたくないフォルダです。jarファイル,シュミレーション結果のmp4動画ファイル,ユーザーの入力情報(input_fol)があります。

# react_document

実際にこのwebアプリケーションをご自身のPCで立ち上げたい方は各自で、react_docuementフォルダを作成してください。react_documentをApacheのDocument rootに指定してください。

# 外部ライブラリ
使用した外部ライブラリはFDTDVideo./libs ディレクトリに入っています。
- jcodec-0.2.5.jar
- jcodec-javase-0.2.5.jar

# 謝辞

柏-達也 教授のご助力なしでは、完成まで至りませんでした。

より多くの人に届く、体験性の高い制作物を柏研究室で行っていきます。　 　

http://kashiwa-lab.net/

