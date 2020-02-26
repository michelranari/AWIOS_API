//
//  Reponse.swift
//  Motee
//
//  Created by Amjad Menouer on 26/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//

import Foundation

class Reponse : Publication {
    @Published private var proposition : Propos
    
    init(userR : Utilisateur, identifierR : Int, contentR : String, anonymousR : Bool, tagsR : [Tag], propos : Propos) {
        self.proposition = propos
        super.init(user: userR, identifier: identifierR, content: contentR, anonymous: anonymousR, tags: tagsR)
    }
}
