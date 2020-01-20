import fetch from './handler';

export const getSudokuResult = (body) => {
    return fetch({
        url: '/end-point-url-here',
        method: 'POST',
        body,
    })
}