<?php
function convertLength($value, $from, $to) {
    $conversionRates = array(
        "Meter" => 1,
        "Kilometer" => 1000,
        "Centimeter" => 0.01,
        "Milimeter" => 0.001,
        "Mile" => 1609.34,
        "Yard" => 0.9144,
        "Foot" => 0.3048,
        "Inch" => 0.0254
    );
    return ($value * $conversionRates[$from]) / $conversionRates[$to];
}

function convertWeight($value, $from, $to) {
    $conversionRates = array(
        "Kilogram" => 1,
        "Gram" => 0.001,
        "Pound" => 0.453592,
        "Ounce" => 0.0283495
    );
    return ($value * $conversionRates[$from]) / $conversionRates[$to];
}

function convertTemperature($value, $from, $to) {
    if ($from == 'Celsius') {
        if ($to == 'Fahrenheit') {
            return ($value * 9/5) + 32;
        } elseif ($to == 'Kelvin') {
            return $value + 273.15;
        }
    } elseif ($from == 'Fahrenheit') {
        if ($to == 'Celsius') {
            return ($value - 32) * 5/9;
        } elseif ($to == 'Kelvin') {
            return ($value - 32) * 5/9 + 273.15;
        }
    } elseif ($from == 'Kelvin') {
        if ($to == 'Celsius') {
            return $value - 273.15;
        } elseif ($to == 'Fahrenheit') {
            return ($value - 273.15) * 9/5 + 32;
        }
    }
    return $value;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $value = $_POST['value'];
    $type = $_POST['type'];
    $from = $_POST['from_unit'];
    $to = $_POST['to_unit'];
    $result = 0;

    if ($type == 'length') {
        $result = convertLength($value, $from, $to);
    } elseif ($type == 'weight') {
        $result = convertWeight($value, $from, $to);
    } elseif ($type == 'temperature') {
        $result = convertTemperature($value, $from, $to);
    }

    header('Location: calculator.php?conversion_result=' . urlencode($result));
    exit();
}
?>
