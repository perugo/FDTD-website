# FDTD-website
二次元電磁波シュミレーションをウェブサイト上で行えます。

http://smartdocs.me


<img src="https://user-images.githubusercontent.com/34999008/215493816-5a02490c-796e-473f-94d2-dbaaa30feb12.gif"   width=600 height=300 >


# ご自身のPCで環境構築する手順

#### html2,htm2_project,FDTDVideoフォルダーをご自身のPCにダウンロード
#### javaのIDEA環境　Intellijをインストール
 - https://www.jetbrains.com/idea/download/#section=windows
#### FDTDVideoフォルダーをintellijのプロジェクトにする
 - Intellijを開き、File-Project-Project-from-existing SourceでFDTDVideoを選択
#### Apacheをインストール
 - DocumentRoot を　●●/html2に指定してください。
#### download.phpとFDTDVideoのFDTDVideoファイルを編集
 - ファイルのディレクトリをご自身のファイル構造に合わせる
#### FDTDVideoプロジェクトをjarファイルに変換する
 -  作成したFDTDVideo.jarをhtml_projectフォルダに入れてください
### 完成！！

# html2
 
html2フォルダにはユーザーが閲覧できるフォルダです。htmlファイル,cssファイル,phpファイルがあります。

# html2_project

html2_projectフォルダにはユーザーに直接触れさせたくない、jarファイル,シュミレーション結果のmp4動画ファイル,ユーザーの入力情報(input_fol)があります。

# FDTDVideo

FDTDVideoフォルダはIntellijで開発を行ったjavaのプロジェクトフォルダです。

FDTDVideoの役割はユーザーの設定した情報をもとに、電磁波解析の計算を行い、mp4動画ファイルを作成することです。

FDTDVideoをjarファイルに変換して、html2_projectフォルダに入れていください。


#外部ライブラリ　External jar library 
使用した外部ライブラリはFDTDVideo./libs ディレクトリに入っています。
- slf4j-api-2.0.6.jar
- xuggle-xuggler-5.4.jar

# 謝辞

柏-達也 教授のご助力なしでは、完成まで至りませんでした。

より多くの人に届く、体験性の高い制作物を柏研究室で行っていきます。　 　

http://kashiwa-lab.net/

