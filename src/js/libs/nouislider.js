import noUiSlider from 'nouislider';

export const rangeSlider = document.querySelector('.range-slider');
document.addEventListener('DOMContentLoaded', () => {
 

    const inputFrom = document.getElementById('from');
    const inputTo = document.getElementById('to');
    
    if (rangeSlider) {
        console.log(typeof inputFrom.dataset.fromMin);
        console.log(typeof inputTo.dataset.toMax);
        noUiSlider.create(rangeSlider, {
            range: {
                min: Number(inputFrom.dataset.fromMin),
                max: Number(inputTo.dataset.toMax)
            },
            values: 0,
            step: 1,
            start: [Number(inputFrom.dataset.fromMin), 0.7 * Number(inputTo.dataset.toMax)],
            connect: true,
            format: {
                to: function (value) {
                    return Math.round(value).toLocaleString('ru-RU') + '₽';
                },
                from: function (value) {
                    return value.replace('₽', '');
                }
            }
        });

      

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


