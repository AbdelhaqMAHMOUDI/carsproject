<?php

namespace App\Entity;

use App\Repository\FutureUserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FutureUserRepository::class)]
class FutureUser
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $ID = null;

    #[ORM\Column(length: 255)]
    private ?string $Email = null;

    #[ORM\Column(length: 255)]
    private ?string $Nom = null;

    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    #[ORM\Column]
    private ?int $Numero_tel = null;

    #[ORM\Column(length: 255)]
    private ?string $nationalit�e = null;

    #[ORM\Column]
    private ?bool $inscription_validee = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setID(int $ID): self
    {
        $this->ID = $ID;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->Email;
    }

    public function setEmail(string $Email): self
    {
        $this->Email = $Email;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->Nom;
    }

    public function setNom(string $Nom): self
    {
        $this->Nom = $Nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNumeroTel(): ?int
    {
        return $this->Numero_tel;
    }

    public function setNumeroTel(int $Numero_tel): self
    {
        $this->Numero_tel = $Numero_tel;

        return $this;
    }

    public function getNationalit�e(): ?string
    {
        return $this->nationalit�e;
    }

    public function setNationalit�e(string $nationalit�e): self
    {
        $this->nationalit�e = $nationalit�e;

        return $this;
    }

    public function isInscriptionValidee(): ?bool
    {
        return $this->inscription_validee;
    }

    public function setInscriptionValidee(bool $inscription_validee): self
    {
        $this->inscription_validee = $inscription_validee;

        return $this;
    }
}
