<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['brand', 'stocks']]
)]
#[ApiFilter(DateFilter::class, properties: ['createdAt'])]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'ipartial', 'brand' => 'exact', 'genre' => 'exact', 'id' => 'exact', 'price' => 'exact', 'description' => 'partial'])]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['brand'])]
    private $id;

    #[ORM\Column(type: 'integer')]
    #[Groups(['brand'])]
    private $price;

    #[ORM\ManyToOne(targetEntity: Brand::class, inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['brand'])]
    private $brand;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['brand'])]
    private $clearance = 0;

    // #[ORM\Column(type: 'datetime')]
    // private $date_created;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: Photo::class)]
    #[Groups(['brand'])]
    private $photos;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: Stock::class)]
    #[Groups(['stocks'])]
    private $stocks;

    #[ORM\ManyToOne(targetEntity: Type::class, inversedBy: 'product')]
    #[Groups(['brand'])]
    private $type;

    #[ORM\ManyToOne(targetEntity: Genre::class, inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['brand'])]
    private $genre;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['brand'])]
    private $name;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private $available;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['brand'])]
    private $description;

    #[ORM\Column(type: 'integer', nullable: true, options: ["default" => 0])]
    #[Groups(['brand'])]
    private $counter;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['brand'])]
    private $weight;

    #[Groups(['brand'])]
    private $clearance_price;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['brand'])]
    private $createdAt;

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['brand'])]
    private $promoted = false;

    public function __construct()
    {
        $this->photos = new ArrayCollection();
        $this->stocks = new ArrayCollection();

        if ($this->getCreatedAt() == null) {
            $this->setCreatedAt(new \DateTimeImmutable());
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClearancePrice(): ?int
    {
        return $this->price - ($this->clearance * $this->price) / 100;
    }
    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getClearance(): ?int
    {
        return $this->clearance;
    }

    public function setClearance(?int $clearance): self
    {
        $this->clearance = $clearance;


        $this->price = $this->price;

        return $this;
    }


    /**
     * @return Collection<int, Photo>
     */
    public function getPhotos(): Collection
    {
        return $this->photos;
    }

    public function addPhoto(Photo $photo): self
    {
        if (!$this->photos->contains($photo)) {
            $this->photos[] = $photo;
            $photo->setProduct($this);
        }

        return $this;
    }

    public function removePhoto(Photo $photo): self
    {
        if ($this->photos->removeElement($photo)) {
            // set the owning side to null (unless already changed)
            if ($photo->getProduct() === $this) {
                $photo->setProduct(null);
            }
        }

        return $this;
    }


    /**
     * @return Collection<int, Stock>
     */
    public function getStocks(): Collection
    {
        return $this->stocks;
    }

    public function addStock(Stock $stock): self
    {
        if (!$this->stocks->contains($stock)) {
            $this->stocks[] = $stock;
            $stock->setProduct($this);
        }

        return $this;
    }

    public function removeStock(Stock $stock): self
    {
        if ($this->stocks->removeElement($stock)) {
            // set the owning side to null (unless already changed)
            if ($stock->getProduct() === $this) {
                $stock->setProduct(null);
            }
        }

        return $this;
    }

    public function getType(): ?Type
    {
        return $this->type;
    }

    public function setType(?Type $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getGenre(): ?Genre
    {
        return $this->genre;
    }

    public function setGenre(?Genre $genre): self
    {
        $this->genre = $genre;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function isAvailable(): ?bool
    {
        return $this->available;
    }

    public function setAvailable(?bool $available): self
    {
        $this->available = $available;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCounter(): ?int
    {
        return $this->counter;
    }

    public function setCounter(int $counter): self
    {
        $this->counter = $counter;

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(?int $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function isPromoted(): ?bool
    {
        return $this->promoted;
    }

    public function setPromoted(?bool $promoted): self
    {
        $this->promoted = $promoted;

        return $this;
    }
}
