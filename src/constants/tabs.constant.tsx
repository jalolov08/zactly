import Home from '@/screens/Home/home.screen';
import Categories from '@/screens/Categories/categories.screen';
import AuthStack from '@/navigation/AuthStack/auth.stack';

export const tabs = [
  {
    name: 'главная',
    component: Home,
  },
  {
    name: 'категории',
    component: Categories,
  },
  {
    name: 'профиль',
    component: AuthStack,
  },
];
