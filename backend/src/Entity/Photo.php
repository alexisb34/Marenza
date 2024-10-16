<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use App\Controller\PhotoController;
use App\Repository\PhotoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @Vich\Uploadable
 */
#[ORM\Entity(repositoryClass: PhotoRepository::class)]
#[ApiResource(
    iri: 'https://schema.org/Photo',
    normalizationContext: ['groups' => ['photo_object:read']],
    itemOperations: ['get', 'put'],
    collectionOperations: [
        'get',
        'upload_file' => [
            'controller' => PhotoController::class,
            'deserialize' => false,
            'method' => "POST",
            'path' => "/photos/{id}",
            'validation_groups' => ['Default', 'photo_object_create'],
            'openapi_context' => [
                'requestBody' => [
                    'content' => [
                        'multipart/form-data' => [
                            'schema' => [
                                // 'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'array',
                                        'items' => [
                                            'type' => 'string',
                                            'format' => 'binary',
                                        ],    
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ]
)]
class Photo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'photos')]
    #[ORM\JoinColumn(nullable: false)]
    private $product;

    #[ORM\ManyToOne(targetEntity: Color::class, inversedBy: 'photos')]
    #[ORM\JoinColumn(nullable: true)]
    private $color;

    // #[ORM\Column(type: 'string', length: 255)]
    // private $path;

    //////////////////////////////////

    #[ApiProperty(iri: 'https://schema.org/contentUrl')]
    #[Groups(['photo_object:read'])]
    public ?string $contentUrl = null;

    /**
     * @Vich\UploadableField(mapping="photo_object", fileNameProperty="path")
     */
    //#[Assert\NotNull(groups: ['photo_object_create'])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['brand'])] 
    public ?string $path = null;

    ///////////////////////////////

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getColor(): ?Color
    {
        return $this->color;
    }

    public function setColor(?Color $Color): self
    {
        $this->color = $Color;

        return $this;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path): self
    {
        $this->path = $path;

        return $this;
    }
}
