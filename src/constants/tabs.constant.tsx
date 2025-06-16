import Home from '@/screens/Home/home.screen';
import Categories from '@/screens/Categories/categories.screen';
import Profile from '@/screens/Profile/profile.screen';

export const tabs = [
  {
    name: 'главная',
    component: Home,
    icon: 'home',
  },
  {
    name: 'категории',
    component: Categories,
    icon: 'briefcase',
  },
  {
    name: 'профиль',
    component: Profile,
    icon: 'heart',
  },
];
