import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { login } from '../../api/auth';
import { saveToken, saveUserId } from '../../utils/token';
const { width, height } = Dimensions.get("window");

export default function LoginScreen() {

    const router = useRouter();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [secure, setSecure] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    //Simple Email & Password form validation
    const validateForm = () => {
        if (!email.trim()) 
            { setError('Email is required'); 
                return false;
            }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Invalid email format'); 
            return false;
         }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long'); 
            return false; 
        }
        setError(null); 
        return true;
    }

 
    //TODO: replace with the actual node API call later
    //Temp fake login function
    async function fakeLogin(email: string, password: string) {
        await new Promise(r => setTimeout(r, 800)); // simulating a network delay 
        //simple fake rule: any email + password "pass123" is valid if (password === 'pass123') 
        if (password === 'pass123') { 
            return { token: 'fake-jwt-token', user: { id: 'u1', email }, profile: { name: 'you' } };
        }
        else { 
            throw new Error('Invalid email or password');
        }
    }

    const onSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
        const data = await login(email, password); 
        console.log("Login response:", data);
        await saveToken(data.token);       
        await saveUserId(data.userId);     
        router.replace('/(tabs)/mainMenu');
    } catch (err: any) {
        setError(err.message || 'Login failed. Please try again.');
    } finally {
        setLoading(false);
    }
};

   
    return (<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.container}>
            <View style={styles.circleOne}/>
            <View style={styles.circleTwo}/>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Log in</Text>

                <TextInput placeholder="Email" placeholderTextColor="#999" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
                <View style={[styles.input, {flexDirection: "row", alignItems: "center"}]}>
                    <TextInput placeholder="Password" placeholderTextColor="#999" style={{flex: 1, color: "#222"}} secureTextEntry={secure} value={password} onChangeText={setPassword}/>

                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                        <Text style={{ paddingHorizontal: 10, fontWeight: "600"}}>
                            {secure ? "show" : "Hide"}
                        </Text>
                        </TouchableOpacity>
                        </View>

                        {error ? (<Text style={{ color: "tomato", marginBottom: 10 }}>{error}</Text>) : null}
                        
                        <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
                            {loading ? (<ActivityIndicator color="#fff" />) : (<Text style={styles.buttonText}>Log In</Text>)}</Pressable>

                            <Link href="/register" asChild>
                                <Pressable style={styles.signupLink}>
                                    <Text style={styles.signupLinkText}>
                                        Don't have an account
                                    </Text>
                                    </Pressable>
                                    </Link>
                                </ScrollView>
                        </View>
    </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: { 
    flex: 1, 
    backgroundColor: "#ececec", // Slightly darker background
    position: "relative",
  },

  // Decorative circles
  circleOne: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#00BFA6", // teal
    top: -50,
    right: -50,
    opacity: 0.2,
  },
  circleTwo: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#00BFA6",
    bottom: -30,
    left: -30,
    opacity: 0.15,
  },

  scrollContainer: { 
    padding: 20, 
    flexGrow: 1, 
    justifyContent: "center" 
  },

  title: { fontSize: 28, fontWeight: "700", color: "#222", marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#222",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  button: {
    backgroundColor: "#a3bfa9", // teal button
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  signupLink: { alignItems: "center", marginTop: 10 },
  signupLinkText: { color: "#007AFF", fontSize: 14 },
});