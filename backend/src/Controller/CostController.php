<?php

namespace App\Controller;

use App\Repository\FeeRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class CostController extends AbstractController
{
    #[Route('/api/calculate_fee', methods: ['POST'])]
    public function fee(Request $request, FeeRepository $fr, ProductRepository $pr, HttpClientInterface $client)
    {
        $basket = $request->get('basket');
        $region = $request->get('region');
        $fee = $fr->find(1);


        $prices = array_map(function ($entry) use ($pr) {
            return $pr->find($entry['product']['id'])->getClearancePrice() * $entry['count'];
        }, $basket);

        $total_weight = array_map(function ($entry) use ($pr) {
            return $pr->find($entry['product']['id'])->getWeight() * $entry['count'];
        }, $basket);


        $res = $client->request(
            'POST',
            'http://localhost:3002/calculate_shipping',
            [
                'headers' => [
                    'Content-type : application/json',
                    'Accept : application/json',
                ],
                'json' => json_encode(
                    [
                        "region" => $region,
                        "weight" => array_sum($total_weight),
                    ]
                )
            ]
        );
        $shipping_cost = $res->toArray();

        return new Response(
            json_encode([
                "sub_total" => array_sum($prices),
                "shipping_cost" => $shipping_cost['shipping_cost'],
                "fee" => $fee->getFee(),
                "total" => array_sum($prices) + $shipping_cost['shipping_cost'] + $fee->getFee(),
            ])
        );
    }
}
