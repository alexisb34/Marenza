<?php

namespace App\Entity;

use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\EditProfilController;
use App\Controller\GetUserController;

#[ApiResource(
    normalizationContext: [
        'groups' => ["user:read"]
    ],
    denormalizationContext: [
        'groups' => ["user:write"]
    ],
    itemOperations: [
        'delete', 'get', 'patch', 'put',
        'get_infos' => [
            'read' => false,
            'method' => 'GET',
            'path' => '/profil/me',
            'controller' => GetUserController::class ],
        'edit' => [
            'read' => false,
            'method' => 'POST',
            'path' => '/users/edit',
            'controller' => EditProfilController::class
        ]
    ]
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity('email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups('user:read')]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\Email]
    #[Groups(['user:write', 'user:read'])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[ApiProperty(security: "is_granted('ROLE_ADMIN')")]
    #[Groups('user:read')]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;


    #[Groups('user:write')]
    #[SerializedName('password')]
    #[Assert\NotBlank()]
    private $plainPassword;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['user:write', 'user:read'])]
    #[Assert\NotBlank()]
    #[Assert\Type('string')]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['user:write', 'user:read'])]
    #[Assert\NotBlank()]
    #[Assert\Type('string')]
    private $lastname;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Address::class)]
    #[Groups(['user:write', 'user:read'])]
    private Collection $addresses;

    public function __construct()
    {
        $this->addresses = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }


    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function setPlainPassword(string $password): self
    {
        $this->plainPassword = $password;

        return $this;
    }

    public function getPlainPassword(): string | null
    {

        return $this->plainPassword;
    }



    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function testRoute()
    {
        return "OK";
    }

    /**
     * @return Collection<int, Address>
     */
    public function getAddresses(): Collection
    {
        return $this->addresses;
    }

    public function addAddress(Address $address): self
    {
        if (!$this->addresses->contains($address)) {
            $this->addresses->add($address);
            $address->setUser($this);
        }

        return $this;
    }

    public function removeAddress(Address $address): self
    {
        if ($this->addresses->removeElement($address)) {
            // set the owning side to null (unless already changed)
            if ($address->getUser() === $this) {
                $address->setUser(null);
            }
        }

        return $this;
    }
}
