import ThemeButton from './components/ThemeButton';
import TodoPanel from './components/TodoPanel';
import Alert from './components/Alert';

function App() {
	console.log('APP RENDERED');
	return (
		<main>
			<ThemeButton />
			<TodoPanel />
			<Alert/>
		</main>
	);
}

export default App;
