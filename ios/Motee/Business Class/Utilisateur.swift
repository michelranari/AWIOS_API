//
//  Utilisateur.swift
//  Motee
//
//  Created by Amjad Menouer on 26/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//
import Combine
import Foundation

class Utilisateur : Identifiable, ObservableObject {
    @Published var pseudo : String
    private var password : String
    @Published var email : String
    @Published var city : String
    @Published var admin : Bool = false
    @Published var banned : Bool = false
    @Published var connected : Bool = false
    @Published var publications : [Publication] = []
    
    var passwordProperties : String {
        get{
            return password
        }
        set{
            password = newValue
        }
    }
    
    var id : String {return email}
    
    init(pseudo : String, password : String, email : String, city : String){
        self.pseudo = pseudo
        self.password = password
        self.email = email
        self.city = city
    }
    
    func bannirUtilisateur(utilisateurABannir : Utilisateur)->Bool{
        if self.admin {
            utilisateurABannir.banned = true
            return true
        } else {
            return false
        }
    }
    
    func equals(utilisateur: Utilisateur)->Bool{
        if(utilisateur.id == self.id) {
            return true
        }else{
            return false
        }
    }
    
}
