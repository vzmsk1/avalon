import noUiSlider from 'nouislider';

export const rangeSlider = document.querySelector('.range-slider');
document.addEventListener('DOMContentLoaded', () => {
    if (rangeSlider) {
        noUiSlider.create(rangeSlider, {
            range: {
                min: 20000,
                max: 850000
            },
            values: 0,
            step: 1,
            start: [20000, 550000],
            connect: true,
            format: {
                to: function (value) {
                    return Math.round(value).toLocaleString('ru-RU') + ' ₽';
                },
                from: function (value) {
                    return value.replace(' ₽', '');
                }
            }
        });

        const inputFrom = document.getElementById('from');
        const inputTo = document.getElementById('to');

        const inputs = [inputFrom, inputTo];

        rangeSlider.noUiSlider.on('update', (values, handle) => {
            inputs[handle].value = values[handle];
        });

        inputs.forEach((input, index) => {
            input.addEventListener('change', (event) => {
                const range = [null, null];
                range[index] = event.currentTarget.value;

                rangeSlider.noUiSlider.set(range);
            });
        });
    }
});


