import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return(
    <Tabs 
      /*screenOptions={{
      tabBarActiveTintColor : "#ffd33d",
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
        backgroundColor: '#25292e',
        },
      }}*/>
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
        name ="about" 
        options={{ 
          title : 'About',
          tabBarIcon : ({focused,color}) => (<Ionicons name={focused ? "information-circle" : "information-circle"}
          size={24}
          color={color}/>
          ),
        }}/>
      <Tabs.Screen name ="not-found" options = {{ title: "Oups! Not Found" }}/>
    </Tabs> 
  );
}
