#Athenia Mobile app

This repo contains the source code used for the Athenia mobile app. This project is based on the ionic framework, which can be found at http://www.ionicframework.com. To get started with development run the following commands from the project root.

```bash
$ npm install -g ionic cordova
$ npm install
$ ionic cordova platform add ios
$ ionic cordova platform add android
```

This is assuming that you already have ios, and android development environments setup on your machine.

For active development use this command while substituting android for ios when need be.
```bash
$ ionic cordova emulate ios -l -- --buildFlag="-UseModernBuildSystem=0"
```

## Deployment

For deployment use the following steps dependent upon platform.

### Android

Before you start deployment for Android make sure that you have the Athenia keystore installed somewhere on your computer. Once that file is installed run the following command to get a store ready build.

```bash
$ ionic cordova build android --prod --release
$ cd platforms/android/app/build/outputs/apk/release/
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore {path to keystore file} app-release-unsigned.apk {keystore alias}
$ zipalign -v 4 app-release-unsigned.apk Athenia.apk
$ apksigner verify Athenia.apk 
```

### iOS

Before you start deployment for iOS make sure you have the Athenia provisioning profiles setup in Xcode. Once that is complete run the next command, and complete the standard build steps in Xcode.

```bash
$ ionic cordova build ios --prod --release -- --buildFlag="-UseModernBuildSystem=0"
```

_Special note - If you are having issues archiving in Xcode then simply turn off automatic signing, and then turn it back on._ 

_Special note #2 - While using cordova ios <5, the builds will need to have `-- --buildFlag="-UseModernBuildSystem=0"` appended to them._