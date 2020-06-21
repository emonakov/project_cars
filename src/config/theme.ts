import { DefaultTheme } from 'styled-components';

const grid = (size: number): string => `${Math.round(size) * 5}px`;

const theme: DefaultTheme = {
    g1: grid(1),
    g2: grid(2),
    g3: grid(3),
    g4: grid(4),
    g5: grid(5),
    g6: grid(6),
    g7: grid(7),
    g8: grid(8),
    g9: grid(9),
    g10: grid(10),
    g20: grid(20),
    grid,
    buttonColor: '#768954',
    textColor: '#4a4a4a',
};

export default theme;
