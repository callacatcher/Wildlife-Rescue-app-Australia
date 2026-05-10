/* =========================
     MAIN APP SCREEN
  ========================= */

 import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
  ActivityIndicator,
  Platform
} from "react-native";

import { StatusBar } from "expo-status-bar";
import ScreenFooter from "../components/ScreenFooter";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { stylesheet as styles } from "../styles/stylesheet";


export default function MainScreen({
  postcode,
  setPostcode,
  error,
  warning,
  loading,
  showAll,
  setShowAll,
  search,
  useMyLocation,
  withLoading,
  displayData,
  pinned,
  togglePin,
  priorityIds,
  onInstall,
  handlePostcodeChange,
  onSignup,
  onFirstAid,
  selectedAnimals,
setSelectedAnimals,
  APP_STORE_LINK,
  PLAY_STORE_LINK,
  setHasSearched = () => {},
  setResults = () => {},
  setNearbyResults = () => {},
  resetSearch,
}) {

  const toggleAnimal = (emoji) => {
  setSelectedAnimals((prev) =>
    prev.includes(emoji)
      ? prev.filter((e) => e !== emoji)
      : [...prev, emoji]
  );
};


  return (
    <View style={[styles.container, { flex: 1 }]}>

      {/* ===== TOP BAR (Home reset + Logo) ===== */}
      <View style={styles.topBar}>
        <TouchableOpacity
  onPress={resetSearch}
  style={styles.homeButton}
>
  <Text style={styles.homeButtonText}>← Home</Text>
</TouchableOpacity>

        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />
      </View>

      
      
      {/* ===== HEADER / SEARCH INPUT ===== */}
      <Text style={styles.subheader}>
        Find a wildlife rescuer near you
      </Text>

      <TextInput
        placeholder="Enter postcode"
        value={postcode}
        onChangeText={handlePostcodeChange}
        style={styles.input}
        keyboardType="numeric"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {warning ? <Text style={styles.warningText}>{warning}</Text> : null}
      <View
  style={{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
  }}
>
  {["🦘", "🐨", "🦅", "🦜", "🦇", "🦎", "🐍"].map((emoji) => {
    const selected = selectedAnimals.includes(emoji);

    return (
      <TouchableOpacity
        key={emoji}
        onPress={() => toggleAnimal(emoji)}
        style={{
          opacity: selected ? 1 : 0.3,
        }}
      >
        <Text style={{ fontSize: 32 }}>{emoji}</Text>
      </TouchableOpacity>
    );
  })}
</View>

    
    
      {/* ===== SEARCH + GPS CONTROLS ===== */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.searchButton, { flex: 1 }]}
          onPress={search}
        >
          <Text style={styles.searchText}>
            {loading ? "Searching..." : "Find Rescuer"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gpsButton}
          onPress={useMyLocation}
        >
          <Text style={styles.gpsText}>📍</Text>
        </TouchableOpacity>
      </View>

      
      
      
      {/* ===== TOGGLE: SHOW ALL CATCHERS ===== */}
      <TouchableOpacity
        onPress={() => setShowAll(!showAll)}
        style={{
          padding: 10,
          backgroundColor: "#ddd",
          borderRadius: 8,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Text>
          {showAll ? "Hide All Rescuers" : "View All Rescuers"}
        </Text>
      </TouchableOpacity>

     
     
     
    {/* ===== RESULTS LIST (CATCHER CARDS) ===== */}
    
{/* ===== RESULTS LIST (CATCHER CARDS) ===== */}
<View style={styles.resultsWrapper}>

  <FlatList
    data={
      
      [...displayData]
        .filter(item => item && item.id && item.name)
        .sort((a, b) => {

          const aPinned = pinned.includes(String(a.id)) ? 1 : 0;
          const bPinned = pinned.includes(String(b.id)) ? 1 : 0;
          if (aPinned !== bPinned) return bPinned - aPinned;

          const aIsSpecial = a.id === "4" ? 1 : 0;
          const bIsSpecial = b.id === "4" ? 1 : 0;
          if (aIsSpecial !== bIsSpecial) return bIsSpecial - aIsSpecial;

          const aPriority =
            Array.isArray(priorityIds) && priorityIds.includes(String(a.id)) ? 1 : 0;
          const bPriority =
            Array.isArray(priorityIds) && priorityIds.includes(String(b.id)) ? 1 : 0;

          if (aPriority !== bPriority) return bPriority - aPriority;

          return 0;
        })
    }
    
contentContainerStyle={{ paddingBottom: 160 }}
    keyExtractor={(item, index) =>
  item?.id ? String(item.id) : `fallback-${index}`
}

    renderItem={({ item }) => {
      if (!item) return null;
      console.log("ITEM:", item);

      return (
        <View style={styles.card}>

          <View style={styles.cardHeader}>
            <Text style={styles.name}>{item.name || "Unknown"}</Text>

            <TouchableOpacity
              onPress={() => togglePin(item.id)}
              style={{ position: "absolute", right: 30 }}
            >
              <Text style={{ fontSize: 25, transform: [{ scale: 1.4 }] }}>
                {pinned.includes(String(item.id)) ? "⭐" : "☆"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: "#666", marginLeft: 10 }}>
            {item.status || ""}
          </Text>

          {item.animals ? (
  <Text
    style={{
      marginLeft: 10,
      marginTop: 4,
      fontSize: 22,
    }}
  >
    {item.animals}
  </Text>
) : null}

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => item.phone && Linking.openURL(`tel:${item.phone}`)}
            >
              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>

            {item.website ? (
              <TouchableOpacity
                style={styles.webButton}
                onPress={() => Linking.openURL(item.website)}
              >
                <Text style={styles.webText}>Website</Text>
              </TouchableOpacity>
            ) : null}

            {item.facebook ? (
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Linking.openURL(item.facebook)}
              >
                <Text style={styles.socialText}>Social</Text>
              </TouchableOpacity>
            ) : null}
          </View>

        </View>
      );
    }}
  />

</View>

  {/* ===== BOTTOM ACTION SECTION (Emergency + App Actions) ===== */}
      <View style={[styles.bottomSection, { marginTop: 10 }]}>

       

        <TouchableOpacity
          style={styles.firstAidButton}
          onPress={onFirstAid}
        >
          <Text style={styles.signupText}>Injured Wildlife Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={onSignup}
        >
          <Text style={styles.signupText}>Rescuer Sign Up</Text>
        </TouchableOpacity>

         <TouchableOpacity
  style={styles.updateButton}
  onPress={onInstall}
>
  <Text style={styles.updateButtonText}>Install App</Text>
</TouchableOpacity>

      </View>

      {/* ===== LOADING OVERLAY ===== */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: "#fff", marginTop: 10 }}>
              Loading...
            </Text>
          </View>
        </View>
      )}

      {/* ===== STATUS + FOOTER ===== */}
      <StatusBar style="dark" />
      <ScreenFooter showAd="home" />

    </View>
    );
}