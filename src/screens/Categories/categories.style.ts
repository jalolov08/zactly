import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors.constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.darkTeal,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.lightBlueGrey,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.lightBlueGrey,
    fontSize: 16,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.darkTeal,
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    fontSize: 16,
    color: colors.lightBlueGrey,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.darkTeal,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.lightBlueGrey,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 100,
  },
  categoryCard: {
    width: '46.5%',
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.darkTeal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  categoryImageContainer: {
    position: 'relative',
    height: 120,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryPlaceholderIcon: {
    fontSize: 32,
  },
  categoryOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  categoryBadge: {
    backgroundColor: colors.teal,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  categoryContent: {
    padding: 16,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkTeal,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: colors.lightBlueGrey,
    lineHeight: 18,
  },
  animation: {
    width: 300,
    height: 300,
  },
});
