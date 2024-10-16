<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;


#[AsController]
class EditProfilController
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function __invoke(EntityManagerInterface $entityManager, Request $request, ValidatorInterface $validator)
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        $user = $this->security->getUser();

        if (isset($data['email']))
            $user->setEmail($data['email']);

        if (isset($data['firstname']))
            $user->setFirstname($data['firstname']);

        if (isset($data['lastname']))
            $user->setLastname($data['lastname']);

        if (isset($data['password']))
            $user->setPlainPassword($data['password']);

        $errors = $validator->validate($user);

        if (count($errors) == 0) {
            $entityManager->persist($user);
            $entityManager->flush();

            $response = new Response(
                'Content',
                Response::HTTP_OK,
                ['content-type' => 'text/html']
            );
            return $response;
        } else
            throw new BadRequestHttpException();
    }
}
