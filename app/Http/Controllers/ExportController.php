<?php

namespace App\Http\Controllers;
use App\Models\Admin\Product;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use App\Exports\ProductExport;
use Illuminate\Support\Facades\Response;

class ExportController extends Controller
{
    public function exportAllEmployee(){
//        return Excel::download(new ProductExport, 'product.xlsx');


        $heading = [
            'id',
            'Title',
            'Description',
            'Availability',
            'Condition',
            'Price',
            'Link',
            'Image',
            'Brand'
        ];

        // Product data
        $productLists = [];

        $products = \App\Models\Admin\Product::get();

        foreach ($products as $product) {
            $productLists[] = [
                'id' => $product->id,
                'Title' => $product->product_name,
                'Description' => $product->product_description,
                'Availability' => $product->single_product_quantity > 0 ? "in stock" : "Out of stock",
                'Condition' => "new", // Assuming 'Condition' is constant
                'Price' => $product->single_product_price,
                'Link' => url("/product/".$product->id),
                'Image' => url("/storage/product/".$product->thumbnail),
                'Brand' => "Luminous Labs",
            ];
        }

        // Create a temporary file
        $tempFilePath = tempnam(sys_get_temp_dir(), 'products_');
        $file = fopen($tempFilePath, 'w');

        // Write header to CSV
        fputcsv($file, $heading);

        // Write product data to CSV
        foreach ($productLists as $product) {
            fputcsv($file, $product);
        }

        // Close file handle
        fclose($file);

        // Set headers for CSV download
        $headers = array(
            'Content-Type' => 'application/csv',
            'Content-Disposition' => 'attachment; filename="products.xlsx"',
        );

        // Send file as response
        return Response::download($tempFilePath, 'products.xlsx', $headers);
    }
}