//
//  Utilisateur.swift
//  Motee
//
//  Created by Amjad Menouer on 26/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//

import Foundation

class Utilisateur : Identifiable, ObservableObject {
    @Published private var pseudo : String
    private var password : String
    @Published private var email : String
    @Published private var city : String
    
    private var admin : Bool = false
    private var banned : Bool = false
    private var connected : Bool = false
    
    @Published private var publications : [Publication] = []
    
    var id : String {return email}
    
    init(pseudo : String, password : String, email : String, city : String){
        self.pseudo = pseudo
        self.password = password
        self.email = email
        self.city = city
    }
}
