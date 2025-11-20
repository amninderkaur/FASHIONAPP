import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [secure, setSecure] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const validateForm = () => {
        if (!email.trim()) { setError('Email is required'); return false; }
        if (!/^\S+@\S+\.\S+$/.test(email)) { setError('Invalid email format'); return false; }
        if (password.length < 6) { setError('Password must be at least 6 characters long'); return false; }
        setError(null); return true;
    }

    //TODO: replace with the actual node API call later
    async function fakeLogin(email: string, password: string) {
        await new Promise(r => setTimeout(r, 800)); // simulating a network delay 
        //simple fake rule: any email + password "pass123" is valid if (password === 'pass123') 
        if (password === 'pass123') { return { token: 'fake-jwt-token', user: { id: 'u1', email }, profile: { name: 'you' } }; }
        else { throw new Error('Invalid email or password'); }
    }
    const onSubmit = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
            //const response = await fetch('API_URL', ); 
            // const response = await Response.json(); 
            const data = await fakeLogin(email, password); // <--- replace with actual API call later

            //TODO: store token securely, e.g. SecureStore, AsyncStorage, Context, Redux, etc. router.replace('/(tabs)'); 
            // navigate to main app screen 
        } catch (err: any) { setError(err.message || 'Login failed. Please try again.'); }
        finally {
            setLoading(false);
        }
    };

    return (<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 24, justifyContent: 'center', gap: 12 }}>
            <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 8 }}>Welcome back</Text>
            <Text style={{ color: '#666', marginBottom: 12 }}>Log in to continue</Text>
            <View style={{ gap: 8 }}>
                <Text style={{ fontWeight: '600' }}>Email</Text>
                <TextInput value={email} onChangeText={setEmail} placeholder="you@example.com" autoCapitalize="none" keyboardType="email-address" style={{ borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10 }} />
            </View>
            <View style={{ gap: 8 }}>
                <Text style={{ fontWeight: '600' }}>Password</Text>
                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry={secure} style={{ flex: 1, padding: 12 }} />
                    <TouchableOpacity onPress={() => setSecure(s => !s)} style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                        <Text style={{ fontWeight: '600' }}>{secure ? 'Show' : 'Hide'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {error ? <Text style={{ color: 'tomato' }}>{error}</Text> : null}
            <TouchableOpacity onPress={onSubmit} disabled={loading} style={{ backgroundColor: '#111827', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 6, opacity: loading ? 0.7 : 1 }} >
                {loading ? <ActivityIndicator /> : <Text style={{ color: 'white', fontWeight: '700' }}>Log in</Text>}
            </TouchableOpacity> <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, gap: 6 }}> <Text>New here?</Text>
                <Link href="../register" style={{ fontWeight: '700' }}>
                    Create account
                </Link>
            </View>
        </View>
    </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    emailContainer: {

    }, passwordContainer: {

    }, logoContainer: {

    }, buttonContainer: {

    }
});