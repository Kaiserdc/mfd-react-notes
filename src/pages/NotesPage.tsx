import {AppShell} from '@mantine/core';
import {Sidebar, Workspace, SearchBox} from '../components/';

export default function NotesPage() {

    return (
        <AppShell
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: false } }}
            padding="md"
        >

            <AppShell.Navbar p="md">
                         <SearchBox/>
                         <Sidebar/>
            </AppShell.Navbar>
            <AppShell.Main>
                <Workspace/>
            </AppShell.Main>
        </AppShell>

    );
}
