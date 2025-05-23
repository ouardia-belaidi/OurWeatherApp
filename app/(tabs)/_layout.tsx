import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return(
    <Tabs screenOptions={{
        tabBarActiveTintColor: "#0083FF",
        tabBarInactiveTintColor: "#888",
        headerStyle: {
          backgroundColor: "#ffffff30",
        },

      }}>
      <Tabs.Screen 
        name ="index" 
        options={{ 
          title : 'Home', 
          tabBarIcon : ({focused, color}) => (<Ionicons name={focused ? "home-sharp" : "home-outline"} 
          size={24}
          color={color}/>
          ), headerShown:false 
        }}/>  
      <Tabs.Screen 
        name ="settings" 
        options={{ 
          title : 'Settings',
          tabBarIcon : ({focused,color}) => (<Ionicons name={focused ? "settings" : "settings"}
          size={24}
          color={color}/>
          ),
          headerShown:false,
        }}/>
      <Tabs.Screen name ="not-found" options = {{ title: "Oups! Not Found" }}/>
    </Tabs> 
  );
}
