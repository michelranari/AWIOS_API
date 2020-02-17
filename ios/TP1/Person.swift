//
//  Person.swift
//  TP1
//
//  Created by user164568 on 2/11/20.
//  Copyright © 2020 user164568. All rights reserved.
//
import Combine
import Foundation

class Person : Identifiable , ObservableObject{
    @Published var  name , firstName , department , profession : String
    var id : String{return self.name}
    init(name: String ,firstName : String, department : String, profession :String ) {
        self.name = name
        self.firstName = firstName
        self.department = department
        self.profession = profession
    }
}
