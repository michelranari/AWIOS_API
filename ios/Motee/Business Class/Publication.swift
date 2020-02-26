//
//  Publication.swift
//  Motee
//
//  Created by Amjad Menouer on 26/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//

import Foundation

class Publication : Identifiable, ObservableObject {
    var idPublication : Int
    @Published var content : String
    @Published var nbLikes : Int = 0
    @Published var anonymous : Bool
    
    @Published var tags : [Tag]
    @Published var user : Utilisateur
    
    var id : Int {return idPublication}
    
    init(user : Utilisateur, identifier : Int, content : String, anonymous : Bool, tags : [Tag]) {
        self.user = user
        self.idPublication = identifier
        self.content = content
        self.anonymous = anonymous
        self.tags = tags
    }
    
    
}
