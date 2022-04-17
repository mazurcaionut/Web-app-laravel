<?php
namespace App;
use Kreait\Firebase\Contract\Storage;
use Kreait\Firebase\Factory;

class FirebaseStorage{
    public Storage $cloudStorage;

    public function __construct($credentialsPath)
    {
        // $storage = (new \Firebase\Factory())
        //     ->withServiceAccount($credentialsPath);

        $firebaseStorageThingy = app("firebase.storage");

        $this->cloudStorage = $firebaseStorageThingy;
    }

    public function getStorage()
    {
        return $this->cloudStorage;
    }
}