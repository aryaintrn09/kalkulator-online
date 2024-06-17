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

    // Fungsi untuk mengupdate unit
    function updateUnits() {
        // Ambil nilai dari input
        let unitType = $('#unitType').val();
        // Ambil unit berdasarkan jenis unit yang dipilih
        let unitOptions = units[unitType];

        // Kosongkan pilihan unit
        $('#inputUnit').empty();
        // Kosongkan pilihan unit
        $('#outputUnit').empty();

        // Tambahkan pilihan unit ke dalam dropdown
        unitOptions.forEach(unit => {
            // Tambahkan pilihan unit ke dalam dropdown
            $('#inputUnit').append(`<option value="${unit.value}">${unit.name}</option>`);
            // Tambahkan pilihan unit ke dalam dropdown
            $('#outputUnit').append(`<option value="${unit.value}">${unit.name}</option>`);
        });
    }

    // Jalankan fungsi updateUnits
    updateUnits();

    // Jalankan fungsi updateUnits ketika jenis unit berubah
    $('#unitType').change(function() {
        // Jalankan fungsi updateUnits
        updateUnits();
    });

    // Fungsi untuk mengkonversi unit
    window.convertUnit = function() {
        // Ambil nilai dari input
        let unitType = $('#unitType').val();
        // Ambil nilai dari input
        let inputUnit = $('#inputUnit').val();
        // Ambil nilai dari input
        let outputUnit = $('#outputUnit').val();
        // Konversi nilai input ke tipe data numerik
        let inputValue = parseFloat($('#inputValue').val());
        // Variabel untuk menyimpan hasil konversi
        let outputValue;

        if (isNaN(inputValue)) {
            // Jika nilai input bukan angka
            alert('Nilai input harus berupa angka');
            return;
        }

        // Konversi unit berdasarkan jenis unit yang dipilih
        switch (unitType) {
            // Konversi unit berdasarkan jenis unit yang dipilih
            case 'length':
                // Konversi panjang
                outputValue = convertLength(inputValue, inputUnit, outputUnit);
                break;
            case 'weight':
                // Konversi berat
                outputValue = convertWeight(inputValue, inputUnit, outputUnit);
                break;
            case 'temperature':
                // Konversi suhu
                outputValue = convertTemperature(inputValue, inputUnit, outputUnit);
                break;
            case 'volume':
                // Konversi volume
                outputValue = convertVolume(inputValue, inputUnit, outputUnit);
                break;
            default:
                // Jika jenis unit tidak ditemukan
                outputValue = inputValue;
        }

        // Tampilkan hasil konversi
        $('#outputValue').val(outputValue);
    }

    // Fungsi untuk mengkonversi panjang
    function convertLength(value, fromUnit, toUnit) {
        // Konversi panjang
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
        // Konversi panjang
        return value * (conversions[toUnit] / conversions[fromUnit]);
    }

    // Fungsi untuk mengkonversi berat
    function convertWeight(value, fromUnit, toUnit) {
        // Konversi berat
        const conversions = {
            kilogram: 1,
            gram: 1000,
            milligram: 1000000,
            pound: 2.20462,
            ounce: 35.274
        };

        // Konversi berat
        return value * (conversions[toUnit] / conversions[fromUnit]);
    }

    // Fungsi untuk mengkonversi suhu
    function convertTemperature(value, fromUnit, toUnit) {
        // Konversi suhu
        let celsiusValue;

        // Konversi suhu
        switch (fromUnit) {
            // Konversi unit berdasarkan jenis suhu yang dipilih
            case 'celsius':
                // Konversi celcius
                celsiusValue = value;
                break;
            case 'fahrenheit':
                // Konversi fahrenheit
                celsiusValue = (value - 32) * 5/9;
                break;
            case 'kelvin':
                // Konversi kelvin
                celsiusValue = value - 273.15;
                break;
            default:
                // Jika jenis suhu tidak ditemukan
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

    // Fungsi untuk mengkonversi volume
    function convertVolume(value, fromUnit, toUnit) {
        // Konversi volume
        const conversions = {
            liter: 1,
            milliliter: 1000,
            cubic_meter: 0.001,
            cubic_centimeter: 1000,
            cubic_inch: 61.0237,
            cubic_foot: 0.0353147
        };

        // Konversi volume
        return value * (conversions[toUnit] / conversions[fromUnit]);
    }
});
