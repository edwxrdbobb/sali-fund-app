import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  {
    name: "Medical Issues and Diseases",
    children: [
      "Malaria Treatment", "Diarrheal Diseases", "Acute Respiratory Infections",
      "HIV/AIDS Care", "Tuberculosis Treatment", "Sickle Cell Disease",
      "Meningitis", "Malnutrition and Stunting", "Typhoid Fever"
    ]
  },
  {
    name: "Infections and Preventable Conditions",
    children: [
      "Measles and Vaccination Coverage", "Helminth (Worm) Infections",
      "Skin Infections", "Ear Infections and Hearing Issues"
    ]
  },
  {
    name: "Accidents and Injuries",
    children: [
      "Trauma from Accidents", "Burn Injuries"
    ]
  },
  {
    name: "Mental Health and Developmental Issues",
    children: [
      "Mental Health Support", "Developmental Disorders",
      "Substance Abuse and Addiction"
    ]
  },
  {
    name: "Gender-Specific and Social Issues",
    children: [
      "Female Genital Mutilation (FGM)", "Gender-Based Violence",
      "Early Pregnancy Complications"
    ]
  },
  {
    name: "Orphanages and Child Care Groups",
    children: [
      "Support for Orphanages", "Child Care Groups"
    ]
  },
  {
    name: "Chronic Conditions",
    children: [
      "Congenital Heart Defects", "Diabetes Management",
      "Asthma and Allergies", "Cerebral Palsy"
    ]
  },
  {
    name: "Nutrition and Lifestyle-Related Issues",
    children: [
      "Obesity and Related Health Issues", "Vision Problems", "Dental Care"
    ]
  },
  {
    name: "Specialized Care Needs",
    children: [
      "Specialist Consultations", "Access to Surgery"
    ]
  }
];

const CategorySelectionScreen = () => {
  const [expanded, setExpanded] = useState(null);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  const handlePress = (index: any) => {
    setExpanded(expanded === index ? null : index);
  };

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    setSelectedItems(prev => {
      const key = `${categoryIndex}-${itemIndex}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const getSelectedItems = () => {
    return Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([key, _]) => {
        const [categoryIndex, itemIndex] = key.split('-').map(Number);
        return categories[categoryIndex].children[itemIndex];
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select a category</Text>
      <Text style={styles.subtitle}>
        Pick the category that best represents your fundraiser
      </Text>
      {categories.map((category, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity
            style={[
              styles.cardHeader,
              expanded === index && styles.expandedHeader
            ]}
            onPress={() => handlePress(index)}
          >
            <Icon name="hand-heart" size={24} color="#7b40e7" />
            <Text style={styles.cardTitle}>{category.name}</Text>
            <Icon
              name={expanded === index ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#7b40e7"
            />
          </TouchableOpacity>
          {expanded === index && category.children.length > 0 && (
            <View style={styles.cardContent}>
              {category.children.map((item, i) => (
                <TouchableOpacity 
                  key={i} 
                  style={styles.checkboxContainer}
                  onPress={() => toggleItem(index, i)}
                >
                  <Icon 
                    name={selectedItems[`${index}-${i}`] ? "checkbox-marked" : "checkbox-blank-outline"} 
                    size={24} 
                    color="#7b40e7" 
                  />
                  <Text style={styles.item}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  expandedHeader: {
    backgroundColor: '#e3dcff',
  },
  cardTitle: {
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  cardContent: {
    paddingLeft: 16,
    paddingBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  item: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default CategorySelectionScreen;