/* =========================
     Injured Wildlife Guide
  ========================= */

import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import ScreenFooter from "../components/ScreenFooter";
import { stylesheet as styles } from "../styles/stylesheet";

export default function FirstAidScreen({ onBack }) {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.homeButton}>
          <Text style={styles.homeButtonText}>← Back</Text>
        </TouchableOpacity>

        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>Injured Wildlife Guide</Text>

      {/* CONTENT AREA */}
      <View style={styles.card2}>

        <Text style={[styles.stepTitle, { color: "#d32f2f" }]}>
          C — CALM THE SITUATION
        </Text>
        <View style={styles.bullets}>
          <Text style={styles.bullet}>• Keep people, pets away </Text>
          <Text style={styles.bullet}>• Don’t crowd or stress the animal further </Text>
        <Text style={styles.bullet}>• If it’s safe, create space around it so it can settle </Text>
        </View>

        <Text style={[styles.stepTitle, { color: "#1565c0" }]}>
          A — ASSESS FROM A DISTANCE
        </Text>
        <View style={styles.bullets}>
          <Text style={styles.bullet}>• Look carefully without getting close </Text>
          <Text style={styles.bullet}>• Check if the animal is injured, stuck, or in danger</Text>
          <Text style={styles.bullet}>• Do NOT touch, chase, or try to move it</Text>
        </View>

        <Text style={[styles.stepTitle, { color: "#6a1b9a" }]}>
          R — REPORT TO WILDLIFE RESCUE
        </Text>
        <View style={styles.bullets}>
          <Text style={styles.bullet}>• Call a local wildlife rescue or emergency wildlife service</Text>
          <Text style={styles.bullet}>• Give clear location details (street, landmarks, GPS if possible)</Text>
          <Text style={styles.bullet}>• Describe what the animal looks like and what it’s doing</Text>
        </View>

        <Text style={[styles.stepTitle, { color: "#2e7d32" }]}>
          E — ENSURE SAFETY (YOURS & THE ANIMAL’S)
        </Text>
        <View style={styles.bullets}>
          <Text style={styles.bullet}>• Stay at a safe distance at all times</Text>
          <Text style={styles.bullet}>• Keep others away until help arrives</Text>
          <Text style={styles.bullet}>• Only intervene if you are trained or instructed</Text>
        </View>

        <Text style={[styles.stepTitle, { color: "#ef6c00" }]}>
          ⚠️ EXTRA
        </Text>
        <View style={styles.bullets}>
          <Text style={styles.bullet}>• Keep the situation calm and quiet</Text>
          <Text style={styles.bullet}>• If you can stay on site untill someone arrives, everyone would be greatful</Text>
        </View>

      </View>

      {/* EMERGENCY BUTTON */}
      <TouchableOpacity
        style={styles.emergencyButton2}
        onPress={() => Linking.openURL("tel:000")}
      >
        <Text style={styles.emergencyText}>
          🚨 Call 000 Emergency
        </Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <ScreenFooter showAd="firstaid" />

    </View>
  );
}