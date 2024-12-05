import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';

const CachedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null);
    const { uri } = props;

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                // Récupérer l'image depuis AsyncStorage
                const cachedImageData = await AsyncStorage.getItem(uri);
                if (cachedImageData) {
                    // Si l'image est déjà en cache
                    setCachedSource({ uri: cachedImageData });
                } else {
                    // Télécharger l'image et la convertir en base64
                    const response = await fetch(uri);
                    const imageData = await response.blob();
                    const reader = new FileReader();
                    reader.readAsDataURL(imageData);
                    reader.onloadend = async () => {
                        const base64Data = reader.result;
                        // Stocker dans AsyncStorage
                        await AsyncStorage.setItem(uri, base64Data);
                        setCachedSource({ uri: base64Data });
                    };
                }
            } catch (error) {
                console.error('Error loading cached image:', error.message);
                // Si une erreur se produit, utiliser l'URI d'origine
                setCachedSource({ uri });
            }
        };

        getCachedImage();
    }, [uri]); // Ajouter `uri` comme dépendance pour détecter les changements

    // Retourner une image avec une source mise en cache ou par défaut
    return (
        <Animated.Image
            source={cachedSource}
            {...props}
            style={[props.style, !cachedSource && { opacity: 0.5 }]} // Style temporaire si pas chargé
        />
    );
};

export default CachedImage;
