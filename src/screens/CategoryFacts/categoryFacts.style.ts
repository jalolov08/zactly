import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors.constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
    zIndex: 10,
  },
  backButton: {
    marginRight: 15,
  },
  categoryTitle: {
    color: colors.darkTeal,
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
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
