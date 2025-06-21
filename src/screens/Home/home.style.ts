import { StyleSheet, Platform } from 'react-native';
import { colors } from '@/constants/colors.constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 25,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  appTitle: {
    color: colors.darkTeal,
    fontSize: 24,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
  loadingContainer: {
    width: 200,
    height: 200,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
