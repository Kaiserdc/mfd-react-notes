import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, TextInput, Button, Title, Stack} from '@mantine/core';
import {useAuth} from '../hooks';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {signIn} = useAuth();

    const handleLogin = () => {
        if (!email) return;
        signIn(email, () => navigate('/notes'));
    };

    return (
        <Container size={420} my={80}>
            <Title style={{alignContent: 'center'}} mb="lg">
                Вход в Заметки
            </Title>
            <Stack>
                <TextInput
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                />
                <Button onClick={handleLogin} fullWidth>
                    Войти
                </Button>
            </Stack>
        </Container>
    );
}