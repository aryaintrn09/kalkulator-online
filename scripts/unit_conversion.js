$(document).ready(function() {
    $('#unitConverter').html(`
        <div class="form-group">
            <label for="unitType">Pilih Jenis Konversi:</label>
            <select class="form-control" id="unitType">
                <option value="length">Panjang</option>
                <option value="weight">Berat</option>
                <option value="temperature">Suhu</option>
                <option value="volume">Volume</option>
            </select>
        </div>
        <div class="form-group">
            <label for="inputUnit">Dari:</label>
            <select class="form-control" id="inputUnit"></select>
        </div>
        <div class="form-group">
            <label for="outputUnit">Ke:</label>
            <select class="form-control" id="outputUnit"></select>
        </div>
        <div class="form-group">
            <label for="inputValue">Nilai Input:</label>
            <input type="number" class="form-control" id="inputValue">
        </div>
        <div class="form-group">
            <label for="outputValue">Nilai Output:</label>
            <input type="text" class="form-control" id="outputValue" readonly>
        </div>
        <button class="btn btn-primary" onclick="convertUnit()">Konversi</button>
    `);

    const units = {
        length: [
            { name: 'Meter', value: 'meter' },
            { name: 'Kilometer', value: 'kilometer' },
            { name: 'Centimeter', value: 'centimeter' },
            { name: 'Millimeter', value: 'millimeter' },
            { name: 'Mile', value: 'mile' },
            { name: 'Yard', value: 'yard' },
            { name: 'Foot', value: 'foot' },
            { name: 'Inch', value: 'inch' }
        ],
        weight: [
            { name: 'Kilogram', value: 'kilogram' },
            { name: 'Gram', value: 'gram' },
            { name: 'Milligram', value: 'milligram' },
            { name: 'Pound', value: 'pound' },
            { name: 'Ounce', value: 'ounce' }
        ],
        temperature: [
            { name: 'Celsius', value: 'celsius' },
            { name: 'Fahrenheit', value: 'fahrenheit' },
            { name: 'Kelvin', value: 'kelvin' }
        ],
        volume: [
            { name: 'Liter', value: 'liter' },
            { name: 'Milliliter', value: 'milliliter' },
            { name: 'Cubic Meter', value: 'cubic_meter' },
            { name: 'Cubic Centimeter', value: 'cubic_centimeter' },
            { name: 'Cubic Inch', value: 'cubic_inch' },
            { name: 'Cubic Foot', value: 'cubic_foot' }
        ]
    };

    function updateUnits() {
        let unitType = $('#unitType').val();
        let unitOptions = units[unitType];

        $('#inputUnit').empty();
        $('#outputUnit').empty();

        unitOptions.forEach(unit => {
            $('#inputUnit').append(`<option value="${unit.value}">${unit.name}</option>`);
            $('#outputUnit').append(`<option value="${unit.value}">${unit.name}</option>`);
        });
    }

    updateUnits();

    $('#unitType').change(function() {
        updateUnits();
    });

    window.convertUnit = function() {
        let unitType = $('#unitType').val();
        let inputUnit = $('#inputUnit').val();
        let outputUnit = $('#outputUnit').val();
        let inputValue = parseFloat($('#inputValue').val());
        let outputValue;

        if (isNaN(inputValue)) {
            alert('Nilai input harus berupa angka');
            return;
        }

        switch (unitType) {
            case 'length':
                outputValue = convertLength(inputValue, inputUnit, outputUnit);
                break;
            case 'weight':
                outputValue = convertWeight(inputValue, inputUnit, outputUnit);
                break;
            case 'temperature':
                outputValue = convertTemperature(inputValue, inputUnit, outputUnit);
                break;
            case 'volume':
                outputValue = convertVolume(inputValue, inputUnit, outputUnit);
                break;
            default:
                outputValue = inputValue;
        }

        $('#outputValue').val(outputValue);
    }

    function convertLength(value, fromUnit, toUnit) {
        const conversions = {
            meter: 1,
            kilometer: 0.001,
            centimeter: 100,
            millimeter: 1000,
            mile: 0.000621371,
            yard: 1.09361,
            foot: 3.28084,
            inch: 39.3701
        };

        return value * (conversions[toUnit] / conversions[fromUnit]);
    }

    function convertWeight(value, fromUnit, toUnit) {
        const conversions = {
            kilogram: 1,
            gram: 1000,
            milligram: 1000000,
            pound: 2.20462,
            ounce: 35.274
        };

        return value * (conversions[toUnit] / conversions[fromUnit]);
    }

    function convertTemperature(value, fromUnit, toUnit) {
        let celsiusValue;

        switch (fromUnit) {
            case 'celsius':
                celsiusValue = value;
                break;
            case 'fahrenheit':
                celsiusValue = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsiusValue = value - 273.15;
                break;
            default:
                celsiusValue = value;
        }

        switch (toUnit) {
            case 'celsius':
                return celsiusValue;
            case 'fahrenheit':
                return (celsiusValue * 9/5) + 32;
            case 'kelvin':
                return celsiusValue + 273.15;
            default:
                return celsiusValue;
        }
    }

    function convertVolume(value, fromUnit, toUnit) {
        const conversions = {
            liter: 1,
            milliliter: 1000,
            cubic_meter: 0.001,
            cubic_centimeter: 1000,
            cubic_inch: 61.0237,
            cubic_foot: 0.0353147
        };

        return value * (conversions[toUnit] / conversions[fromUnit]);
    }
});
