import {createRoot} from 'react-dom/client';
import {Preview} from './Preview';

const container = document.getElementById('root');

if (!container) {
  throw new Error('#root nao encontrado');
}

createRoot(container).render(<Preview />);
