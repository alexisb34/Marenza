<?php

namespace App\Controller;

use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Security\Core\Security;

#[AsController]
class GetUserController
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }
    public function __invoke()
    {
        return $this->security->getUser();
    }
}
