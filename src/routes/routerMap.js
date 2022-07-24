import { Home, Auth, Task, EditTask } from "./../pages";

export const routesMap = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/register",
    component: <Auth />,
  },
  {
    path: "/login",
    component: <Auth />,
  },
  {
    path: "/create-task",
    component: <Task />,
  },
  {
    path: "/edit-task/:id",
    component: <EditTask />,
  },
];
