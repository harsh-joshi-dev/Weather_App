import { StyleSheet } from "react-native";

const createStyles = (darkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 20,
      backgroundColor: darkMode ? '#121212' : 'lightgrey',
    },
    topBar: {
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 10,
      alignSelf: "center",
    },
    topBarRight: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flex: 1,
      alignItems: 'center',
    },
    unitToggle: {
      marginRight: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    unitToggleText: {
      color: darkMode ? '#fff' : '#000',
      fontSize: 22,
      marginEnd: 5,
    },
    searchBarContainer: {
      width: '100%',
      marginTop: '12%',
      backgroundColor: 'transparent',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      padding: 2,
    },
    darkInput: {
      backgroundColor: '#1e1e1e',
      borderColor: '#333',
    },
    input: {
      padding: 11,
      width: '73%',
      color: darkMode ? '#fff' : '#000',
      fontSize: 15,
    },
    searchButton: {
      backgroundColor: '#e0e0e0',
      width: '22%',
      padding: 10,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    darkButton: {
      backgroundColor: '#555',
    },
    searchButtonText: {
      color: '#000',
      fontWeight: '500',
      fontSize: 14,
    },
    darkButtonText: {
      color: '#fff',
    },
    error: {
      color: 'red',
      marginTop: 10,
    },
    weatherDetails: {
      width: '100%',
      marginTop: 15,
    },
    loadingIndicator: {
      flex: 1,
    },
  });

export default createStyles;
