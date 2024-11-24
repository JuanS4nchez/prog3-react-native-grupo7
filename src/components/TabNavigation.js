import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NuevoPost from "../screens/NuevoPost"
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-circle" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="NuevoPost"
        component={NuevoPost}
        
        options={{
          tabBarIcon: () => (
            <AntDesign name="pluscircle" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
