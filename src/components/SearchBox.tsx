import {TextInput, Container} from '@mantine/core'
// import {useEffect, useState} from 'react'
import {useNotes} from '../hooks'

export function SearchBox() {
    const { setSearchTerm } = useNotes();

    return (
        <Container p="xs">
            <TextInput
                placeholder="Поиск..."
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
            />
        </Container>
    );
}