const { getDefaultConfig } = require("expo/metro-config");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

// Appliquer la configuration pour NativeWind
const nativeWindConfig = withNativeWind(defaultConfig, { input: "./global.css" });

// Appliquer la configuration pour Reanimated
const config = wrapWithReanimatedMetroConfig(nativeWindConfig);

module.exports = config;
