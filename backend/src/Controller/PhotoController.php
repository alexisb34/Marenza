<?php 

namespace App\Controller;

use App\Entity\Photo;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Repository\ProductRepository;
use Doctrine\Persistence\ManagerRegistry;

#[AsController]
final class PhotoController extends AbstractController
{
    public function __invoke(Request $request, ProductRepository $repository, ManagerRegistry $doctrine, $id ): array
    {
        $entityManager = $doctrine->getManager();
        $newId = $repository->find($id);
        $tab = [];
        //  dd($newId);

        // $uploadedFile = $request->files->get('file');
        // dd($request->files->all());
        // if (!$uploadedFile) {
        //     throw new BadRequestHttpException('"file" is required');
        // }
        
        // return $photoObject;
        foreach ($request->files->all() as $photo) {
           
            // dd($request->files->all());
            // foreach ($photos as $photo) {
                
            $photoObject = new Photo();
            $photoObject->file = $photo;
            $photoObject->setProduct($newId);
            $entityManager->persist($photoObject);
            array_push($tab, $photo);
            // }
        }   

        $entityManager->flush();

        return $tab;


    }
}