export interface PlaceModel{
    name: string,
    state: string,
    image: string,
    thumbnail: string,
    description: string,
    position: Position,
    createdAt: FirebaseFirestore.Timestamp,
    updatedAt: FirebaseFirestore.Timestamp
}

export interface Position{
    latitude: number,
    longitude: number
}