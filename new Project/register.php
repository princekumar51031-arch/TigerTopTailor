<?php
include("config.php");

if (isset($_POST['submit'])) {

    $customer_name = $_POST['customer_name'];
    $mobile = $_POST['mobile'];
    $address = $_POST['address'];

    $product_name = $_POST['product_name'];
    $category = $_POST['category'];
    $price = $_POST['price'];

    $measurement_type = $_POST['measurement_type'];
    $measurement_details = $_POST['measurement_details'];

    $measurement_date = !empty($_POST['measurement_date']) 
        ? $_POST['measurement_date'] 
        : NULL;

    $delivery_date = $_POST['delivery_date'];
    $payment_method = $_POST['payment_method'];

    $sql = "INSERT INTO orders 
    (customer_name, mobile, address, product_name, category, price,
     measurement_type, measurement_details, measurement_date,
     delivery_date, payment_method)
    VALUES (
        '$customer_name',
        '$mobile',
        '$address',
        '$product_name',
        '$category',
        '$price',
        '$measurement_type',
        '$measurement_details',
        " . ($measurement_date ? "'$measurement_date'" : "NULL") . ",
        '$delivery_date',
        '$payment_method'
    )";

    if (mysqli_query($con, $sql)) {
        echo "Order Placed Successfully";
    } else {
        echo "Error: " . mysqli_error($con);
    }
}
?>
