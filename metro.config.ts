import { getDefaultConfig } from 'expo/metro-config';

const config = (() => {
  const defaultConfig = getDefaultConfig(__dirname);

  const { transformer, resolver } = defaultConfig;

  return {
    ...defaultConfig,
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve("react-native-css-transformer")
    },
    resolver: {
      ...resolver,
      assetExts: resolver?.assetExts ? resolver.assetExts.filter((ext: string) => ext !== "css") : [],
      sourceExts: [...(resolver?.sourceExts || []), "css"]
    }
  };
})();

export default config;